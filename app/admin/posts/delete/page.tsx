"use client";

import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import {useSession} from "next-auth/react";

export default function AdminDeletePost() {
    const [slug, setSlug] = useState("");
    const [message, setMessage] = useState("");
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
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!slug) {
            setMessage("Slug is required");
            return;
        }

        const res = await fetch(`/api/posts?slug=${slug}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setMessage("Post deleted successfully");
            // Optionally redirect after deletion
            router.push("/admin/posts/delete");
        } else {
            const error = await res.json();
            setMessage(error.error || "Error deleting post");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">投稿削除</h1>
            <form onSubmit={handleDelete} className="space-y-4">
                <input
                    type="text"
                    placeholder="削除する投稿のスラッグ"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    削除する
                </button>
            </form>

            {message && <p className="mt-4 text-lg">{message}</p>}
        </div>
    );
}
