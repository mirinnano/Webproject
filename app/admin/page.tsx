// app/admin/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from "next/link";
import { HiPlusCircle, HiPencil, HiTrash } from "react-icons/hi"; // アイコンのインポート

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'loading') return;
        if (!session?.user || session.user.email !== 'admin@admin.com') {
            router.push('/admin/login');
        } else {
            setLoading(false);
        }
    }, [session, status, router]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">管理者ダッシュボード</h1>

            {/* 管理者名の表示 */}
            <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
                {session?.user?.email ? `管理者さん、ようこそ！` : 'ログインしていません。'}
            </p>

            {/* 管理者用リンク */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 投稿の追加 */}
                <Link href="/admin/posts/new" className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg hover:shadow-2xl transition transform hover:scale-105">
                    <span className="text-xl text-gray-700 dark:text-gray-100">投稿の追加</span>
                    <HiPlusCircle className="text-2xl text-blue-500" />
                </Link>

                {/* 投稿の編集 */}
                <Link href="/admin/posts/edit" className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg hover:shadow-2xl transition transform hover:scale-105">
                    <span className="text-xl text-gray-700 dark:text-gray-100">投稿の編集</span>
                    <HiPencil className="text-2xl text-yellow-500" />
                </Link>

                {/* 投稿の削除 */}
                <Link href="/admin/posts/delete" className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg hover:shadow-2xl transition transform hover:scale-105">
                    <span className="text-xl text-gray-700 dark:text-gray-100">投稿の削除</span>
                    <HiTrash className="text-2xl text-red-500" />
                </Link>
                <Link href="/admin/posts/upload" className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg hover:shadow-2xl transition transform hover:scale-105">
                    <span className="text-xl text-gray-700 dark:text-gray-100">画像ファイルのアップロード</span>
                    <HiPlusCircle className="text-2xl text-blue-500" />
                </Link>
            </div>
        </div>
    );
}
