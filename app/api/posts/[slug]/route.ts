/* eslint-disable */
import { NextResponse } from 'next/server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    try {
        const filePath = path.join(process.cwd(), 'app/posts', `${slug}.md`);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter, content } = matter(fileContents);

        // Markdownファイルのslugを取得し、frontmatterとcontentを返す
        return NextResponse.json({
            slug: slug, // slugs自体
            frontmatter: {
                title: frontmatter.title ?? 'Untitled',
                date: frontmatter.date ?? '1970-01-01',
                description: frontmatter.description ?? '',
                tags: frontmatter.tags ?? [],
                views: frontmatter.views ?? 0,
                thumbnail: frontmatter.thumbnail ?? null,
            },
            content: content, // contentも返す
        });
    } catch (error) {
        return NextResponse.error();
    }
}
