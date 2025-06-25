import Image from 'next/image';
import { AnimateOnScroll } from "@/components/animation/AnimateOnScroll";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | ロメダ (Romeda)',
  description: '当サイト「ロメダ (Romeda) | 公式サイト」のプライバシーポリシーに関するページです。',
  robots: {
    index: false, // 通常、プライバシーポリシーページは検索結果に表示させない
    follow: true,
  }
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "2025年6月25日";

  return (
    <div className="bg-gray-900 text-white">
      {/* ヒーローセクション */}
      <div className="relative bg-gray-800 py-24 sm:py-32">
        <div className="absolute inset-0">
          <Image
            src="/hero-background.jpg"
            alt="Background"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <AnimateOnScroll>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
              プライバシーポリシー
            </p>
          </div>
        </AnimateOnScroll>
      </div>
      
      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <AnimateOnScroll>
          <div className="bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <article className="prose prose-lg prose-invert text-gray-300">
              <p>ロメダ運営（以下「当方」といいます）は、当方が運営するウェブサイト「ロメダ (Romeda) | 公式サイト」（以下「当サイト」といいます）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。</p>
              
              <h2>第1条（個人情報）</h2>
              <p>「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。</p>

              <h2>第2条（個人情報の収集方法）</h2>
              <p>当サイトでは、お問い合わせフォームのご利用時に、お名前（ハンドルネーム）、メールアドレス等の個人情報をご登録いただく場合がございます。これらの個人情報は、ご提供いただく際の目的以外では利用いたしません。</p>

              <h2>第3条（アクセス解析ツールについて）</h2>
              <p>当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは<a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer">Googleアナリティクス利用規約</a>をご覧ください。</p>

              <h2>第4条（広告配信サービスについて）</h2>
              <p>当サイトは、第三者配信の広告サービス「Googleアドセンス」を利用しています。広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。Cookieを無効にする設定およびGoogleアドセンスに関する詳細は<a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer">広告 – ポリシーと規約 – Google</a>をご覧ください。</p>

              <h2>第5条（プライバシーポリシーの変更）</h2>
              <p>本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。</p>
              <p>当方が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。</p>

              <hr />
              <p className="text-right text-sm">最終更新日: {lastUpdated}</p>

            </article>
          </div>
        </AnimateOnScroll>
      </main>
    </div>
  );
}