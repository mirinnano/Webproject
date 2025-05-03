// app/discordRPC/route.ts
export const runtime = 'nodejs'

import { Client, PresenceData} from 'discord.js-selfbot-v13';
import { NextRequest } from 'next/server';

interface Payload {
  details: string;
  state: string;
  type?: 'PLAYING' | 'LISTENING' | 'WATCHING' | 'STREAMING' | 'COMPETING';
  largeImageKey?: string;
  largeImageText?: string;
  startTimestamp?: number;
}

const DISCORD_TOKEN = process.env.DISCORD_TOKEN ;
// 本番環境では↑のようなトークンは絶対に直書きせず、環境変数で管理してください

if (!DISCORD_TOKEN) throw new Error('環境変数 DISCORD_TOKEN が設定されていません。');

let loginPromise: Promise<Client> | null = null;

async function getClient(): Promise<Client> {
  if (!loginPromise) {
    loginPromise = (async () => {
      const client = new Client();
      await client.login(DISCORD_TOKEN);
      console.log(`🔑 Logged in as ${client.user!.tag}`);
      return client;
    })();
  }
  return loginPromise;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload = body as Partial<Payload>;
    const {
      details,
      state,
      type = 'PLAYING',
      largeImageKey,
      largeImageText,
      startTimestamp,
    } = payload;

    if (!details || !state) {
      return new Response(JSON.stringify({ error: 'details と state は必須です。' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const bot = await getClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const activity: any = {
      name: details,
      state: state,
      type: type,
      timestamps: startTimestamp ? { start: startTimestamp } : undefined,
      assets: {
        large_image: largeImageKey,
        large_text: largeImageText,
      },
    };

    const presence: PresenceData = {
      activities: [activity],
      status: 'online',
      afk: false,
    };

    await bot.user!.setPresence(presence);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Presence 更新エラー:', error);
    // エラー発生時はキャッシュをクリア
    loginPromise = null;

    return new Response(JSON.stringify({ error: 'Presence の更新に失敗しました。' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}