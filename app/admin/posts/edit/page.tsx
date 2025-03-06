"use client";

import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// SSR を無効にして Markdown エディタを読み込む
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import "easymde/dist/easymde.min.css";
import {useSession} from "next-auth/react";

export default function AdminNewPost() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [tags, setTags] = useState("");
    const [readingTime, setReadingTime] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [slug, setSlug] = useState("");
    const router = useRouter();
    const { data: session, status } = useSession();

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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const post = {
            title,
            date,
            tags: tags.split(",").map(tag => tag.trim()),
            readingTime,
            description,
            content,
            slug, // 投稿にスラッグを追加
        };

        const res = await fetch("/api/posts", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post)
        });

        if (res.ok) {
            alert("投稿が変更されました");
            // 投稿作成後にリダイレクト
            router.push("/admin/posts/edit");
        } else {
            alert("投稿作成に失敗しました");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">投稿編集</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="タイトル"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="タグ (カンマ区切り)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="読了時間 (例: 5分)"
                    value={readingTime}
                    onChange={(e) => setReadingTime(e.target.value)}
                    className="w-full border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="説明文"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="編集する投稿ID (URLに使われる識別子)"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <div>
                    <SimpleMDE value={content} onChange={setContent} />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    投稿する
                </button>
            </form>
        </div>
    );
}
