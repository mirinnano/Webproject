/* eslint-disable */
// 新規投稿作成 (POST)
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import matter from 'gray-matter';
import { generateSitemap } from '@/app/sitemap';

export async function POST(req: Request) {
    const data = await req.json();
    const { title, date, tags, readingTime, description, thumbnail, content } = data;

    // タイトルから簡易的な slug を生成
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // SEO対策とOGタグのHTMLを作成
    const seoMetaTags = `
        <meta name="description" content="${description || 'Default description for SEO'}">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description || 'Default description for SEO'}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${title}">
        <meta name="twitter:description" content="${description || 'Default description for SEO'}">
        <meta name="twitter:image" content="${thumbnail || 'default-thumbnail.jpg'}">
    `;

    // frontmatterの設定
    const frontmatter = {
        title,
        date,
        tags,
        readingTime,
        description,
        thumbnail,
        seoMetaTags, // SEOメタタグをfrontmatterに追加
    };
    const contents = content+seoMetaTags;
    // Markdownのcontentとfrontmatterを使って記事ファイルを作成
    const fileContent = matter.stringify(contents, frontmatter);

    // ユニークIDを生成
    const uniqueId = uuidv4();
    const filePath = path.join(process.cwd(), 'app/posts', `${slug}-${uniqueId}.md`);

    try {
        // 記事のファイルを作成
        fs.writeFileSync(filePath, fileContent, 'utf8');
        // @ts-ignore

        return NextResponse.json({ message: 'Post created successfully', slug });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
    }
}


// 投稿更新 (PUT)
export async function PUT(req: Request) {
    const data = await req.json();
    const { title, date, tags, readingTime, description, content, slug } = data;
    const frontmatter = { title, date, tags, readingTime, description };
    const fileContent = matter.stringify(content, frontmatter);
    const filePath = path.join(process.cwd(), 'app/posts', `${slug}.md`);

    try {
        fs.writeFileSync(filePath, fileContent, 'utf8');
        return NextResponse.json({ message: 'Post updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
    }
}

// 投稿削除 (DELETE)
export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    if (!slug) {
        return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }
    const filePath = path.join(process.cwd(), 'app/posts', `${slug}.md`);

    try {
        fs.unlinkSync(filePath);
        return NextResponse.json({ message: 'Post deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
    }
}
