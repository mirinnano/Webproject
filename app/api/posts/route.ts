// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { v4 as uuidv4 } from 'uuid';
// 新規投稿作成 (POST)
export async function POST(req: Request) {
    const data = await req.json();
    const { title, date, tags, readingTime, description, content } = data;
    // タイトルから簡易的な slug を生成（必要に応じてライブラリ化する）
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const frontmatter = { title, date, tags, readingTime, description };
    const fileContent = matter.stringify(content, frontmatter);
    const uniqueId = uuidv4();
    const filePath = path.join(process.cwd(), 'app/posts', `${slug}${uniqueId}.md`);

    try {
        fs.writeFileSync(filePath, fileContent, 'utf8');
        return NextResponse.json({ message: 'Post created successfully', slug });
    } catch (error) {
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
