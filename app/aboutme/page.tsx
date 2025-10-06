// app/aboutme/page.tsx
'use client';

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function AboutMePage() {
  const enter = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.48 } } };
  const stagger = { show: { transition: { staggerChildren: 0.06 } } };

  React.useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const onScroll = () => {
      document.documentElement.style.setProperty('--scrollY', `${window.scrollY}px`);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const onMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;
      document.documentElement.style.setProperty('--mx', `${x}px`);
      document.documentElement.style.setProperty('--my', `${y}px`);
    };
    window.addEventListener('mousemove', onMouse);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <>
      <Head>
  {/* 基本 */}
  <title>みりん（学芸大学） — ポートフォリオ</title>
  <meta name="description" content="みりん（学芸大学） — 日本株・先物・米株・プログラミング(Go/Rust/Python)・ノベルゲーム好き。自宅サーバーでホストしています。" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="theme-color" content="#f8f3ff" />
  <meta name="robots" content="index, follow" />

  {/* Canonical / URL（実際の公開URLに合わせて書き換えてください） */}
  <link rel="canonical" href="https://romeda.tokiwakano.uk/aboutme" />

  {/* Open Graph (Discord / Facebook 等) */}
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="ja_JP" />
  <meta property="og:site_name" content="romeda.tokiwakano.uk" />
  <meta property="og:url" content="https://romeda.tokiwakano.uk/aboutme" />
  <meta property="og:title" content="みりん（学芸大学） — ポートフォリオ" />
  <meta property="og:description" content="日本株・先物・米株の運用/自動化、Go/Rust/Pythonでのツール開発、ノベルゲームを愛するエンジニア。自宅サーバーでこのサイトをホストしています。" />
  <meta property="og:image" content="https://romeda.tokiwakano.uk/images/share-dejiko.webp" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Romeda — みりんのポートフォリオ（デ・ジ・キャラット背景）" />

  {/* Twitter / X Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@Rnuri_" />
  <meta name="twitter:creator" content="@Rnuri_" />
  <meta name="twitter:title" content="みりん（学芸大学） — ポートフォリオ" />
  <meta name="twitter:description" content="日本株・先物・米株の運用/自動化、Go/Rust/Pythonでのツール開発、ノベルゲームを愛するエンジニア。" />
  <meta name="twitter:image" content="https://romeda.tokiwakano.uk/images/dejiko-bg.webp" />
  <meta name="twitter:image:alt" content="Romeda — みりんのポートフォリオ（デ・ジ・キャラット背景）" />

  {/* favicon / touch icon（任意。publicに置く） */}
  <link rel="icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

  {/* 構造化データ（Person） — 検索スニペットの信頼向上に有効 */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "みりん（学芸大学）",
        "url": "https://romeda.tokiwakano.uk/aboutme",
        "sameAs": [
          "https://x.com/61233839281",
          "https://romeda.tokiwakano.uk",
          "https://github.com/mirinnano"
        ],
        "jobTitle": "Software Engineer",
        "description": "日本株・先物・米株の運用/自動化、Go/Rust/Python を用いたツール開発、ノベルゲームを愛するエンジニア。"
      }),
    }}
  />

  {/* フォントの preconnect（既に読み込んでいる場合は不要） */}
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;500;600;700&display=swap" rel="stylesheet" />
</Head>


      <div className="page">
        {/* 動画背景（フルブリード） */}
        <div className="bg-wrap" aria-hidden>
          <video
            className="bg-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/dejiko-poster.webp"
            aria-hidden
          >
            <source src="/videos/dejiko-bg.webm" type="video/webm; codecs=vp9,opus" />
            <source src="/videos/dejiko-bg.mp4" type="video/mp4" />
          </video>
          <div className="bg-overlay" />
          <div className="bg-paper" />
        </div>

        {/* stage */}
        <div className="stage">
          <motion.main className="main" initial="hidden" animate="show" variants={stagger}>
            <motion.section id="hero" variants={enter} className="hero card">
              <div className="hero-left">
                <div className="nameRow">
                  <img src="/images/avatar.webp" alt="avatar" className="avatarInline" />
                  <div className="titleWrap">
                    <h1 className="name">学芸大学（みりん）</h1>
                    <p className="subtitle">Rust ・ Go エンジニア ／ 昔の萌え文化 とガジェットが好き</p>
                  </div>
                </div>

                <p className="summary measure">
                  ノスタルジーを大切に、短いイテレーションで価値を出すエンジニアです。マーケットのデータ処理・自動化、プロトタイプ制作、ノベル表現の設計などを行っています。
                </p>

                <div className="hero-meta">
                  <div className="meta-pill">Self-hosted: 自宅サーバーでホスト</div>
                  <div className="meta-pill subtle">Focus: UI 自動化 / プロトタイプ</div>
                </div>
              </div>

             <article className="infoBox">
                  <h3 className="infoTitle">マーケット関連</h3>
                  <p className="infoText">日本株（個別）・日経先物・米株の実戦的運用とツール化（データ収集・検証・自動化）。小さなスクリプトから運用系の自動化まで対応。</p>
                </article>
            </motion.section>

            <motion.section id="works" variants={enter} className="card works">
              <h2 className="sectionTitle">私ができること（要約）</h2>

              {/* ここで paper を廃止し、infoBox に統一 */}
              <div className="grid3">
                <article className="infoBox">
                  <h3 className="infoTitle">マーケット関連</h3>
                  <p className="infoText">日本株（個別）・日経先物・米株の実戦的運用とツール化（データ収集・検証・自動化）。小さなスクリプトから運用系の自動化まで対応。</p>
                </article>

                <article className="infoBox">
                  <h3 className="infoTitle">プログラミング</h3>
                  <p className="infoText">Go / Rust / Python を中心にツール開発、データ処理、スクリプト自動化、バックエンド基盤の設計をしています。</p>
                </article>

                <article className="infoBox">
                  <h3 className="infoTitle">クリエイティブ / 趣味</h3>
                  <p className="infoText">ノベルゲーム鑑賞・プレイ（素晴らしき日々 / 不連続存在 等）、短編プロトタイプ制作やUI表現の設計。</p>
                </article>
              </div>
            </motion.section>

            <motion.section id="skills" variants={enter} className="card skills">
              <h2 className="sectionTitle">スキル（具体）</h2>
              <div className="skill-grid">
                <div className="skill">
                  <div className="label">言語</div>
                  <div className="value">Go / Rust / Python / Java / C++</div>
                </div>

                <div className="skill">
                  <div className="label">マーケット</div>
                  <div className="value">日本株（個別）・日経先物・米株（運用・分析・自動化）</div>
                </div>

                <div className="skill">
                  <div className="label">インフラ</div>
                  <div className="value">自宅サーバー運用（Proxmox, LXC）, Docker, nginx</div>
                </div>
              </div>
            </motion.section>

            <motion.section id="about" variants={enter} className="card about">
              <h2 className="sectionTitle">自己紹介</h2>

              <p className="lead measure">
                小さな懐かしさ（ノスタルジー）と、現場で役立つ「速さ」を両立させるのが好きです。休日はノベルゲームや音楽、スマホいじり、ゲームを楽しみつつ、マーケットの検証や小さなプロトタイプを作っています。
              </p>

              <div className="twoCol">
                <div>
                  <h4>プレイ中・好きな作品</h4>
                  <p className="muted">素晴らしき日々 / 不連続存在 など</p>
                </div>

                <div>
                  <h4>趣味</h4>
                  <p className="muted">音楽・スマホ・ゲーム</p>
                </div>
              </div>

              <p className="deepthink">私が将来残すべき文化とは何か、いつも深く考えています。</p>
            </motion.section>

            <motion.section variants={enter} className="card music">
              <h2 className="sectionTitle">Play me — BGM</h2>
              <div className="iframeWrap">
                <iframe data-testid="embed-iframe" style={{ borderRadius: 12 }} src="https://open.spotify.com/embed/track/3TWuDDyTtIA718MUE6yX2G?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
              </div>
            </motion.section>
          </motion.main>

          {/* Right panel */}
          <aside className="discordPanel" aria-label="Profile panel" style={{ transform: 'translateY(calc(var(--scrollY, 0px) * 0.06))' }}>
            <div className="panelTop">
              <div className="dp-avatar">
                <img src="/images/avatar.webp" alt="avatar" />
                <span className="dp-status" />
              </div>

              <div className="dp-meta">
                <div className="dp-name">学芸大学</div>
                <div className="dp-sub">lastingmoment • He/him</div>
              </div>
            </div>

            <div className="panelBody">
              <div className="dp-bio readable">
                で自己ちゃあああああああああああああああああああああああああああああああああああああああああああああああああああん；；
              </div>

              <div className="dp-section">
                <div className="dp-section-title">アクティビティ</div>
                <div className="dp-activity">
                  <div className="act-card">
                    <div className="act-icon">💻</div>
                    <div>
                      <div className="act-title">Coding</div>
                      <div className="muted">Go / Rust / Python</div>
                    </div>
                  </div>

                  <div className="act-card small">
                    <div className="muted">ゲーム: League of Legends </div>
                  </div>
                </div>
              </div>

              <div className="dp-links">
                <a href="https://blog.tokiwakano.uk" target="_blank" rel="noreferrer">ロメダ公式サイト</a>
                <a href="https://github.com/mirinnano" target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        :root{
          --white:#ffffff; --ink:#111; --muted:#6b6b6b; --accent:#8b57ff;
          --paper: #fff7f0;
          --panel-border:#ece6e0;
          --glass-bg: rgba(255,252,249,0.92);
        }
        html,body,#root{height:100%}
        .page { min-height:100vh; position:relative; background:transparent; font-family: "Comfortaa", "Noto Serif JP", serif; color:var(--ink); overflow-x:hidden; }

        /* BACKGROUND (省略せずそのまま維持) */
        .bg-wrap { position:fixed; inset:0; z-index:0; pointer-events:none; overflow:hidden; display:block; }
        .bg-video { position:fixed; inset:0; width:100vw; height:100vh; object-fit:cover; filter: saturate(1.02) brightness(1.03) contrast(0.98); opacity:0.98; will-change: transform, filter, opacity; transform-origin:center; animation: subtleZoom 30s linear infinite alternate; transform: translateY(calc(var(--scrollY, 0px) * -0.01)) scale(1); }
        .bg-overlay { position:fixed; inset:0; background: linear-gradient(180deg, rgba(255,255,255,0.46), rgba(255,250,245,0.75)); pointer-events:none; }
        .bg-paper { position:fixed; inset:0; background-image: url('/images/paper-texture.webp'); background-size: 700px 700px; opacity:0.22; pointer-events:none; mix-blend-mode:multiply; }
        @keyframes subtleZoom { 0% { transform: translateY(0) scale(1); } 100% { transform: translateY(-0.6%) scale(1.02); } }

        /* layout */
        .stage { position:relative; z-index:2; margin:40px auto; padding:0 28px; display:grid; gap:24px; align-items:start; width: min(1500px, calc(100vw - 80px)); grid-template-columns: minmax(0, 1fr) 340px; }
        .main { display:flex; flex-direction:column; gap:18px; min-width:0; }
        .card { background: var(--glass-bg); border-radius:12px; padding:18px; box-shadow: 0 8px 26px rgba(14,14,14,0.05); border:1px solid var(--panel-border); transition: transform .22s cubic-bezier(.2,.9,.2,1), box-shadow .22s; }
        .card:hover { transform: translateY(-6px); box-shadow: 0 18px 56px rgba(14,14,14,0.08); }

        .hero { display:flex; justify-content:space-between; gap:18px; align-items:flex-start; min-width:0; transform: translate3d(var(--mx,0px), var(--my,0px),0); transition:transform .18s linear; }
        .nameRow { display:flex; gap:12px; align-items:center; }
        .avatarInline { width:68px; height:68px; border-radius:12px; object-fit:cover; box-shadow: 0 8px 30px rgba(139,87,255,0.06); border:2px solid rgba(255,255,255,0.92); }
        .titleWrap { display:flex; flex-direction:column; gap:4px; }
        .name { font-size:26px; margin:0; color:var(--ink); letter-spacing:0.3px; }
        .subtitle { margin:0; color:var(--muted); font-size:13px; }
        .summary { margin-top:12px; color:#222; line-height:1.64; }

        .hero-meta { margin-top:12px; display:flex; gap:10px; flex-wrap:wrap; }
        .meta-pill { background: var(--paper); border-radius:999px; padding:8px 12px; font-size:13px; color:var(--ink); box-shadow: 0 6px 18px rgba(16,16,16,0.02); border:1px solid rgba(0,0,0,0.02); }
        .meta-pill.subtle { background:transparent; border:1px dashed rgba(0,0,0,0.03); color:var(--muted); }

        .hero-aside { width:320px; }
        .accentCard { background: linear-gradient(180deg,#fff,#fff7f5); border-radius:12px; padding:12px; border:1px solid rgba(0,0,0,0.02); box-shadow: 0 6px 18px rgba(16,16,16,0.03); }
        .accentTitle { font-weight:700; margin-bottom:8px; }
        .accentList { margin:0; padding-left:18px; color:var(--muted); }

        .sectionTitle { display:flex; align-items:center; gap:12px; margin:0 0 12px; font-size:18px; color:var(--ink); }
        .sectionTitle::after { content:""; flex:1; height:1px; background:linear-gradient(90deg, transparent, rgba(0,0,0,0.05)); margin-left:12px; border-radius:2px; }

        /* ここが変更点： paper -> infoBox に統一して馴染ませる */
        .grid3 { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }

        .infoBox {
          background: transparent;
          border-left: 3px solid rgba(139,87,255,0.20); /* 控えめなアクセントライン */
          padding:14px 12px;
          border-radius:8px;
          min-height:86px;
          display:flex;
          flex-direction:column;
          justify-content:flex-start;
          gap:8px;
        }
        .infoTitle { margin:0; font-size:15px; font-weight:700; color:var(--ink); }
        .infoText { margin:0; color:#222; font-size:14px; line-height:1.6; opacity:0.95; }

        .skill-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-top:8px; }
        .skill .label { font-size:12px; color:var(--muted); }
        .skill .value { margin-top:6px; color:var(--ink); }

        .lead { line-height:1.7; color:#333; }
        .twoCol { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:12px; }
        .deepthink { margin-top:12px; font-style:italic; color:var(--muted); }

        .iframeWrap { background:transparent; border-radius:12px; overflow:hidden; }

        .discordPanel { position:sticky; top:28px; background: #fff8f4; color:var(--ink); border-radius:12px; padding:14px; box-shadow: 0 10px 30px rgba(8,8,8,0.06); border:1px solid var(--panel-border); max-height: calc(100vh - 56px); overflow:auto; scrollbar-width:none; -ms-overflow-style:none; }
        .discordPanel::-webkit-scrollbar { width:0; height:0; display:none; }
        .panelTop { display:flex; gap:12px; align-items:center; margin-bottom:12px; }
        .dp-avatar img { width:72px; height:72px; border-radius:12px; object-fit:cover; display:block; }
        .dp-status { position:absolute; right:-6px; bottom:-6px; width:18px; height:18px; background:#3bd671; border-radius:50%; border:3px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.12); }

        .dp-meta .dp-name { font-weight:700; font-size:15px; color:var(--ink); }
        .dp-sub { color:var(--muted); font-size:13px; margin-top:4px; }

        .dp-bio.readable { margin:10px 0; color:var(--ink); font-size:13px; line-height:1.5; max-height:110px; overflow:auto; padding-right:6px; }

        .dp-section { margin-top:8px; color:var(--ink); }
        .dp-section-title { font-weight:700; font-size:13px; margin-bottom:8px; border-bottom:1px solid rgba(0,0,0,0.03); padding-bottom:8px; }
        .act-card { display:flex; gap:10px; align-items:center; background:#fff; padding:8px; border-radius:8px; margin-bottom:8px; border:1px solid rgba(0,0,0,0.02); }
        .act-icon { width:44px; height:44px; background:linear-gradient(180deg,#f9f9f9,#f3f3f3); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:18px; }

        .dp-links { margin-top:12px; display:flex; flex-direction:column; gap:8px; }
        .dp-links a { color:var(--accent); font-size:13px; text-decoration:none; }

        .sticker { position:fixed; left:26px; top:120px; z-index:30; font-family:'Comfortaa', monospace; color:#cdaeff; opacity:0.95; pointer-events:none; transform-origin:center; font-size:16px; animation: drift 8s ease-in-out infinite; }
        @keyframes drift { 0% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-8px) rotate(6deg); } 100% { transform: translateY(0) rotate(-4deg); } }

        .measure { max-width: 70ch; }

        @media (max-width:1200px) {
          .stage { width: calc(100vw - 40px); grid-template-columns: 1fr 300px; }
          .avatarInline { width:62px; height:62px; }
          .grid3 { grid-template-columns:1fr 1fr; }
        }
        @media (max-width:980px) {
          .stage { grid-template-columns: 1fr; padding:0 18px; gap:18px; }
          .hero-aside { display:none; }
          .discordPanel { position:relative; order:2; max-height:none; overflow:visible; }
          .grid3 { grid-template-columns:1fr; }
          .skill-grid { grid-template-columns:1fr; }
          .twoCol { grid-template-columns:1fr; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bg-video, .sticker, .card, .hero { animation: none !important; transition: none !important; transform: none !important; }
        }
      `}</style>

      <div className="sticker" aria-hidden>にょ</div>
    </>
  );
}
