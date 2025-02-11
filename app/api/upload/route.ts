import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// POST リクエストを処理
export async function POST(req: Request) {
    // 送信された FormData を解析
    const formData = await req.formData();

    // ファイルとフィールドを取得
    const file = formData.get('file') as File;

    if (!file) {
        return NextResponse.json({ error: 'File is missing' }, { status: 400 });
    }

    // ファイルを保存する場所
    const uploadDir = path.join(process.cwd(), 'public');
    const filePath = path.join(uploadDir, file.name);

    // 保存先のディレクトリが存在しない場合は作成
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // ファイルを保存
    const buffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));

    return NextResponse.json({ message: 'File uploaded successfully', filePath });
}
