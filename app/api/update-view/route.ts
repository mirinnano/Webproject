// app/api/update-view/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function POST(request: Request) {
    const { slug } = await request.json();

    // 投稿ファイルのパス（例：プロジェクト直下の app/posts フォルダ）
    const postFilePath = path.join(process.cwd(), 'app', 'posts', `${slug}.md`);

    if (!fs.existsSync(postFilePath)) {
        return NextResponse.json({ success: false, message: '投稿が見つかりません' }, { status: 404 });
    }

    // Markdown ファイルを読み込む
    const fileContents = fs.readFileSync(postFilePath, 'utf8');

    // frontmatter（メタデータ）の取得
    const { data: frontmatter, content } = matter(fileContents);

    // views 数を更新
    const updatedViews = (frontmatter.views || 0) + 1;

    // 新しいフロントマターを作成
    const updatedFrontmatter = { ...frontmatter, views: updatedViews };

    // 新しい内容をMarkdownに書き戻す
    const updatedFileContents = matter.stringify(content, updatedFrontmatter);

    // 更新された内容をファイルに書き込む
    fs.writeFileSync(postFilePath, updatedFileContents, 'utf8');

    return NextResponse.json({ success: true, views: updatedViews });
}
