// app/api/update-view/route.ts
/* eslint-disable */
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    const { slug } = await request.json();

    // JSON ファイルのパス（例：プロジェクト直下の data/views.json）
    const jsonFilePath = path.join(process.cwd(), 'data', 'views.json');

    // 既存の view 数データを読み込み
    let viewsData: { [key: string]: number } = {};
    if (fs.existsSync(jsonFilePath)) {
        const fileContent = fs.readFileSync(jsonFilePath, 'utf8');
        try {
            viewsData = JSON.parse(fileContent);
        } catch (err) {
            viewsData = {};
        }
    }

    // 対象の記事の view 数を更新
    viewsData[slug] = (viewsData[slug] || 0) + 1;

    // 更新後のデータを JSON ファイルに書き込み
    fs.writeFileSync(jsonFilePath, JSON.stringify(viewsData, null, 2), 'utf8');

    return NextResponse.json({ success: true, views: viewsData[slug] });
}
