"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

// SSR を無効にして Markdown エディタを読み込む
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import "easymde/dist/easymde.min.css";

export default function AdminNewPost() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [tags, setTags] = useState("");
    const [readingTime, setReadingTime] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const post = {
            title,
            date,
            tags: tags.split(",").map(tag => tag.trim()),
            readingTime,
            description,
            content
        };

        const res = await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post)
        });

        if (res.ok) {
            alert("Post created successfully");
            // 必要に応じてフォームをリセットしたり、一覧ページへリダイレクト
        } else {
            alert("Error creating post");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">新規投稿作成</h1>
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
                    placeholder="日付"
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
