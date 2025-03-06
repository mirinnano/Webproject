import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// postsディレクトリの絶対パスを取得
const postsDirectory = path.join(process.cwd(), 'app/posts'); // `app/posts`がディレクトリのパス

// GETメソッドのエクスポート（ランダムな投稿を返す）
export async function GET(request: Request) {
    try {
        // postsディレクトリ内のファイルを取得
        const fileNames = fs.readdirSync(postsDirectory);

        // Markdownファイルのメタデータを格納する配列
        const posts = fileNames.map((fileName) => {
            const fullPath = path.join(postsDirectory, fileName);

            // ファイルがディレクトリでないことを確認
            const stats = fs.lstatSync(fullPath);
            if (stats.isDirectory()) {
                return null; // ディレクトリならスキップ
            }

            // ファイル名の拡張子を除去
            const slug = fileName.replace(/\.md$/, '');

            // Markdownファイルを読み込んでfrontmatterを取得
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data: frontmatter } = matter(fileContents);

            return {
                slug,
                frontmatter: {
                    title: frontmatter.title ?? 'Untitled', // frontmatterからタイトルを取得
                    thumbnail: frontmatter.thumbnail ?? null,
                    description: frontmatter.description ?? '',
                    tags: frontmatter.tags ?? [],
                }
            };
        }).filter(post => post !== null); // nullを除外

        // リクエストのURLを確認して、ランダムな投稿かすべての投稿かを判断
        const url = new URL(request.url);
        const isRandomEndpoint = url.pathname.endsWith('/random'); // '/random'エンドポイントかどうか

        if (isRandomEndpoint) {
            // ランダムな4件を選択して返す
            const randomPosts = posts.sort(() => Math.random() - 0.5).slice(0, 4);
            return NextResponse.json(randomPosts);
        } else {
            // すべての投稿を返す
            return NextResponse.json(posts);
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}
