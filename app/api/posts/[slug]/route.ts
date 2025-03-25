/* eslint-disable */
import { NextResponse } from 'next/server';
import viewsData from '@/data/views.json';
import { getRandomPost } from '@/lib/utils';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    try {
        const filePath = path.join(process.cwd(), 'app/posts', `${slug}.md`);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter, content } = matter(fileContents);

        return NextResponse.json({
            slug: slug,
            title: frontmatter.title ?? 'Untitled',
            date: frontmatter.date ?? '1970-01-01',
            description: frontmatter.description ?? '',
            tags: frontmatter.tags ?? [],
            readingTime: frontmatter.readingTime ?? '',
            content: content,
            views: viewsData[slug] ?? 0,
            nextPost: getRandomPost(slug),
        });
    } catch (error) {
        return NextResponse.error();
    }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { title, date, tags, readingTime, description, content, newSlug } = await request.json();

    try {
        const oldFilePath = path.join(process.cwd(), 'app/posts', `${slug}.md`);
        const newFilePath = path.join(process.cwd(), 'app/posts', `${newSlug}.md`);

        // 新しいfrontmatterを作成
        const frontmatter = {
            title,
            date,
            tags,
            readingTime,
            description
        };

        // 新しいMarkdownコンテンツを作成
        const newContent = `---\n${Object.entries(frontmatter)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n')}\n---\n\n${content}`;

        // ファイルを書き込み
        fs.writeFileSync(newFilePath, newContent);

        // 古いファイルを削除（slugが変更された場合）
        if (slug !== newSlug) {
            fs.unlinkSync(oldFilePath);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.error();
    }
}
