
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // 1. ヘッダーから認証情報を取得
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.API_SECRET_KEY}`) {
    // 認証キーが一致しない場合はエラー
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // 2. リクエストボディからデータを取得
    const { onlineMembers, totalMembers } = await request.json();

    if (typeof onlineMembers !== 'number' || typeof totalMembers !== 'number') {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // 3. Vercel KVにデータを保存
    await kv.set('server-stats', { onlineMembers, totalMembers });

    // 4. 成功レスポンスを返す
    return NextResponse.json({ success: true, onlineMembers, totalMembers });

  } catch (error) {
    console.error('Error updating server stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
