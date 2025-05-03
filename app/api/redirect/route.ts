import { NextResponse } from 'next/server'
import axios from 'axios'
import { Agent } from 'node:https'
import dns from 'node:dns'

// エンコード済みスラッシュを保護するためのユーティリティ
const preserveEncodedSlashes = (url: string): string => 
  url.replace(/%2F/gi, '__ENCODED_SLASH__');

const restoreEncodedSlashes = (url: string): string =>
  url.replace(/__ENCODED_SLASH__/g, '%2F');

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const targetUrl = searchParams.get('url')

  if (!targetUrl) {
    return NextResponse.redirect(new URL('/edu', request.url))
  }

  try {
    // URLデコード処理（エンコード済みスラッシュを保護）
    const decodedUrl = restoreEncodedSlashes(
      decodeURIComponent(preserveEncodedSlashes(targetUrl))
    );

    // URL正規化
    const normalizedUrl = decodedUrl
      .replace(/^https?:\/+/i, 'https://')
      .replace(/(https?:\/\/[^/]+)(.*)/, (_, host: string, path: string) => {
        const cleanedHost = host.replace(/\.+/g, '.');
        const cleanedPath = path.replace(/\/{2,}/g, '/');
        return `${cleanedHost}${cleanedPath}`;
      });

    const tempUrl = new URL(normalizedUrl);
    if (!/^https:\/\/[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}/.test(tempUrl.toString())) {
      throw new Error('Invalid URL format');
    }

    // DNS解決（IPv4強制）
    const ipv4Address = await new Promise<string>((resolve, reject) => {
      dns.lookup(tempUrl.hostname, { family: 4 }, (err, address) => {
        if (err) {
          console.error('DNS Lookup Failed:', { 
            hostname: tempUrl.hostname, 
            error: err.message,
            stack: err.stack
          });
          reject(new Error('DNS lookup failed'));
        }
        resolve(address);
      });
    });

    // プロキシURL構築（IPv4明示指定）
    const proxyUrl = new URL(`https://${ipv4Address}`);
    proxyUrl.port = '443';
    proxyUrl.pathname = tempUrl.pathname;
    proxyUrl.search = tempUrl.search;

    // 許可ドメイン検証
    const allowedDomains = ['www.rakuten-bank.co.jp', 'rakuten-bank.co.jp'];
    if (!allowedDomains.includes(tempUrl.hostname)) {
      throw new Error(`Domain not allowed: ${tempUrl.hostname}`);
    }

    // HTTPSエージェント設定（IPv4接続強制）
    const httpsAgent = new Agent({ 
      family: 4,
      localAddress: '127.0.0.1',
      lookup: (hostname, options, callback) => {
        dns.lookup(hostname, { family: 4 }, (err, addresses) => {
          callback(err, addresses, 4);
        });
      }
    });

    // プロキシリクエスト実行
    const proxyResponse = await axios.get(proxyUrl.toString(), {
      httpsAgent,
      headers: {
        'Host': tempUrl.hostname,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      maxRedirects: 0,
      validateStatus: null,
      timeout: 15000
    });

    // コンテンツ変換（エンコード保護を維持）
    let content = proxyResponse.data;
    if (proxyResponse.headers['content-type']?.includes('text/html')) {
      content = content
        .replace(/(href|src)=["'](.*?)["']/gi, (match: string, attr: string, url: string) => {
          try {
            const absoluteUrl = new URL(url, tempUrl).toString();
            return `${attr}="/api/redirect?url=${encodeURIComponent(preserveEncodedSlashes(absoluteUrl))}"`;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (_error: unknown) { // 未使用の例外変数を明示的に無視
            console.warn('Invalid URL detected:', url);
            return match;
          }
        })
        .replace(/url\(['"]?(.*?)['"]?\)/gi, (match: string, url: string) => {
          try {
            const absoluteUrl = new URL(url, tempUrl).toString();
            return `url("/api/redirect?url=${encodeURIComponent(preserveEncodedSlashes(absoluteUrl))}")`;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (_error: unknown) { // 未使用の例外変数を明示的に無視
            console.warn('Invalid CSS URL detected:', url);
            return match;
          }
        });
    }

    return new Response(restoreEncodedSlashes(content), {
      status: proxyResponse.status,
      headers: {
        'Content-Type': proxyResponse.headers['content-type'] || 'text/html',
        'Access-Control-Allow-Origin': request.headers.get('origin') || '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, HEAD',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
        'Vary': 'Origin',
        'Cache-Control': 'no-store, max-age=0',
        'X-Content-Type-Options': 'nosniff'
      }
    });

  } catch (error: unknown) {
    console.error('Proxy Error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.redirect(new URL('/edu/safety-exit', request.url));
  }
}
