export default function Disclaimer() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
            <div className="max-w-3xl w-full bg-white dark:bg-gray-800 p-10 shadow-lg rounded-lg">
                <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900 dark:text-gray-100 border-b pb-4">
                    免責事項
                </h1>
                <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    <p>
                        当ブログに掲載されている情報は、個人の見解や経験に基づくものであり、専門的なアドバイスや公式な情報ではありません。すべての情報は、十分な検証を行っておりますが、その正確性や完全性を保証するものではありません。
                    </p>
                    <p>
                        利用者の皆様は、当ブログの情報を自己責任においてご利用ください。情報の誤りや不備に起因するいかなる損害に対しても、運営者および当ブログは一切の責任を負いかねます。
                    </p>
                    <p>
                        また、当ブログからリンクされている第三者サイトの内容や利用に関しても、当ブログは一切の責任を負いません。リンク先の利用規約やプライバシーポリシーをご確認の上、ご利用ください。
                    </p>
                    <p>
                        以上の点についてご了承いただいた上で、本サイトをご利用いただきますようお願い申し上げます。
                    </p>
                </div>
            </div>
        </div>
    );
}
