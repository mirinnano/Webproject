"use client";

import {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';

// SSR を無効にして Markdown エディタを読み込む
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import "easymde/dist/easymde.min.css";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function AdminNewPost() {
    const [title, setTitle] = useState(() => {
        const saved = localStorage.getItem('draft_title');
        return saved || "";
    });
    const [date, setDate] = useState(() => {
        // JSTに変換 (UTC+9時間)
        const now = new Date();
        const jstOffset = 9 * 60; // JSTはUTC+9時間
        const jstDate = new Date(now.getTime() + jstOffset * 60 * 1000);
        const saved = localStorage.getItem('draft_date');
        return saved || jstDate.toISOString().split('T')[0];
    });
    const [tags, setTags] = useState(() => {
        const saved = localStorage.getItem('draft_tags');
        return saved || "";
    });
    const [suggestedTags] = useState([
        "技術", "ブログ", "Next.js", "TypeScript",
        "React", "JavaScript", "Web開発", "フロントエンド",
        "バックエンド", "デザイン", "UI/UX", "パフォーマンス"
    ]);
    const [readingTime, setReadingTime] = useState(() => {
        const saved = localStorage.getItem('draft_readingTime');
        return saved || "";
    });
    const [description, setDescription] = useState(() => {
        const saved = localStorage.getItem('draft_description');
        return saved || "";
    });
    const [content, setContent] = useState(() => {
        const saved = localStorage.getItem('draft_content');
        return saved || "";
    });
    const [thumbnail, setThumbnail] = useState(() => {
        const saved = localStorage.getItem('draft_thumbnail');
        return saved || "";
    });
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

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!title.trim()) newErrors.title = "タイトルは必須です";
        if (!date) newErrors.date = "日付を選択してください";
        if (!content.trim()) newErrors.content = "本文を入力してください";
        if (tags.split(",").length > 5) newErrors.tags = "タグは5つまでです";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const post = {
                title,
                date,
                tags: tags.split(",").map(tag => tag.trim()),
                readingTime,
                description,
                content,
                thumbnail
            };

            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(post)
            });

            if (res.ok) {
                router.push("/admin/posts");
            } else {
                const errorData = await res.json();
                setErrors({ form: errorData.message || "投稿に失敗しました" });
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "ネットワークエラーが発生しました";
            setErrors({ form: message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">新規投稿作成</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        タイトル <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="記事のタイトルを入力"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full border p-2 rounded ${
                            errors.title ? "border-red-500" : ""
                        }`}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        投稿日 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={`w-full border p-2 rounded ${
                            errors.date ? "border-red-500" : ""
                        }`}
                    />
                    {errors.date && (
                        <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        タグ (カンマ区切り、最大5つ)
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="例: 技術,ブログ,Next.js"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className={`w-full border p-2 rounded ${
                                errors.tags ? "border-red-500" : ""
                            }`}
                        />
                        {tags.length === 0 && (
                            <div className="absolute top-full left-0 w-full bg-white border rounded shadow-lg mt-1 z-10">
                                <div className="p-2 text-sm text-gray-500">よく使われるタグ:</div>
                                <div className="flex flex-wrap gap-2 p-2">
                                    {suggestedTags.map((tag) => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => setTags(tag)}
                                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-200 transition"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {errors.tags && (
                        <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
                    )}
                </div>
                <input
                    type="text"
                    placeholder="読了時間 (例: 5分)"
                    value={readingTime}
                    onChange={(e) => setReadingTime(e.target.value)}
                    className="w-full border p-2 rounded"
                />
                <div>
                    <label className="block text-sm font-medium mb-1">説明文</label>
                    <textarea
                        placeholder="記事の概要を簡潔に説明"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border p-2 rounded min-h-[100px]"
                        maxLength={200}
                    />
                    <p className="text-sm text-gray-500 mt-1 text-right">
                        {description.length}/200
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        サムネイル画像
                    </label>
                    <input
                        type="text"
                        placeholder="画像URLを入力、または下のボタンでアップロード"
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                        className="w-full border p-2 rounded mb-2"
                    />
                    <button
                        type="button"
                        onClick={() => router.push("/admin/posts/upload")}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition text-sm"
                    >
                        画像をアップロード
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        本文 <span className="text-red-500">*</span>
                    </label>
                    <div className={`border rounded ${
                        errors.content ? "border-red-500" : ""
                    }`}>
                        <SimpleMDE
                            value={content}
                            onChange={setContent}
                            options={{
                                spellChecker: false,
                                toolbar: [
                                    "bold", "italic", "heading", "|",
                                    "quote", "unordered-list", "ordered-list", "|",
                                    "link", "image", "code", "|",
                                    "preview", "side-by-side", "fullscreen", "|",
                                    "guide"
                                ],
                                sideBySideFullscreen: false,
                                status: false
                            }}
                        />
                    </div>
                    {errors.content && (
                        <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                    )}
                </div>
                {errors.form && (
                    <div className="bg-red-50 border border-red-500 text-red-700 px-4 py-2 rounded">
                        {errors.form}
                    </div>
                )}
                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                投稿中...
                            </div>
                        ) : (
                            "投稿する"
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            localStorage.setItem('draft_title', title);
                            localStorage.setItem('draft_date', date);
                            localStorage.setItem('draft_tags', tags);
                            localStorage.setItem('draft_readingTime', readingTime);
                            localStorage.setItem('draft_description', description);
                            localStorage.setItem('draft_content', content);
                            localStorage.setItem('draft_thumbnail', thumbnail);
                            alert('下書きを保存しました');
                        }}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition flex-1"
                    >
                        下書き保存
                    </button>
                </div>
            </form>
        </div>
    );
}