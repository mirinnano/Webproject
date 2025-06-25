/* eslint-disable */
import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // gray-matterをインポート

// Article（投稿記事）の型を以下のようにします。
interface Article {
    slug: string; // slugs自体
    frontmatter: {
        title: string;
        date: string;
        description: string;
        tags: string[];
        views: number;
        thumbnail: string | null;
    };
    content: string; // contentも返す
}

// 投稿記事一覧を取得する関数
async function getArticlesFromFileSystem(): Promise<Article[]> {
    const postsDirectory = path.join(process.cwd(), 'app/posts');
    const fileNames = fs.readdirSync(postsDirectory);

    const articles = fileNames
        .filter((fileName) => path.extname(fileName) === '.md') // Markdownファイルをフィルタリング
        .map((fileName) => {
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data: frontmatter, content } = matter(fileContents);

            // fileNameから拡張子を除いてslugを取得
            const slug = fileName.replace(/\.md$/, '');

            return {
                slug,
                frontmatter: {
                    title: frontmatter.title ?? 'Untitled',
                    date: frontmatter.date ?? '1970-01-01',
                    description: frontmatter.description ?? '',
                    tags: frontmatter.tags ?? [],
                    views: frontmatter.views ?? 0,
                    thumbnail: frontmatter.thumbnail ?? null,
                },
                content,
            };
        });

    return articles;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseURL = process.env.NEXT_PUBLIC_URL || 'https://romeda.tokiwakano.uk'; // 環境変数から取得する（URLを変更可能）
    const _lastModified = new Date();

    // 投稿記事一覧を取得
    let articles: Article[] = [];

    try {
        articles = await getArticlesFromFileSystem(); // 実際にファイルシステムからデータを取得
        if (!Array.isArray(articles)) {
            throw new Error('The fetched articles are not an array');
        }
    } catch (error) {
        console.error('Failed to fetch articles for sitemap:', error);
        articles = []; // エラー時でも空配列にして処理を続行
    }

    // 静的ページURL（これらは固定）
    const staticPaths = [
        { url: `${baseURL}`, lastModified: _lastModified },
        { url: `${baseURL}/about`, lastModified: _lastModified },
        { url: `${baseURL}/management`, lastModified: _lastModified }, // --- [追加] ---
        { url: `${baseURL}/privacy-policy`, lastModified: _lastModified }, // --- [追加] ---
        { url: `${baseURL}/disclaimer`, lastModified: _lastModified }, // --- [追加] ---
       
    ];

    // 投稿記事のURL（動的ページ）
    const dynamicPaths = articles.map((article: Article) => ({
        url: `${baseURL}/posts/${article.slug}`, // `${article.slug}`を使う
        lastModified: new Date(article.frontmatter.date), // 投稿の作成日時を基に更新日時を設定
        priority: 0.8,
    }));

    // 静的ページと動的ページのURLを返す
    return [...staticPaths, ...dynamicPaths];
}

export interface generateSitemap {
}