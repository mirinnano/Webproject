// app/admin/posts/new.tsx
/* eslint-disable */
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// SSR を無効にして Markdown エディタを読み込む
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import "easymde/dist/easymde.min.css";

export default function AdminNewPost() {

    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null); // 画像ファイルの状態管理
    const [imageUrl, setImageUrl] = useState(""); // 画像のURL

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const post = {

            content,
            imageUrl, // 投稿に画像URLを含める
        };

        // 画像のアップロード処理
        if (image) {
            const formData = new FormData();
            formData.append("file", image);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setImageUrl(data.filePath); // 画像URLを取得
            } else {
                alert("Error uploading image");
                return;
            }
        }

        const res = await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post),
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

                <div>
                    <SimpleMDE value={content} onChange={setContent} />
                </div>

                {/* 画像選択 */}
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border p-2 rounded"
                    />
                    {imageUrl && <p>画像がアップロードされました: <img src={imageUrl} alt="Uploaded" className="w-32 mt-2" /></p>}
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
