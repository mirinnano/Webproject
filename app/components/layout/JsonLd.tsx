// このコンポーネントはサーバーサイドで完結します
export const JsonLd = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization', // あなたのサイトが「組織」であることを示す
    name: 'ロメダ (Romeda)',
    url: 'https://romeda.tokiwakano.uk',
    logo: 'https://romeda.tokiwakano.uk/logo.png', // publicに配置したロゴ画像
    description: 'Discordサーバー「ロメダ」の公式サイト。ゲーム、創作、雑談を楽しむカオスでアクティブなコミュニティです。',
    sameAs: [ // 関連するSNSアカウントなど
      'https://x.com/61233839281', // TODO: ここも実際のTwitter URLに書き換えてください
      'https://github.com/mirinnano',
      "https://discord.gg/bSAgveD9Ru"
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};