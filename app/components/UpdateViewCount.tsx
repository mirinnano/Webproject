// app/components/UpdateViewCount.tsx
'use client';

import { useEffect } from 'react';

type UpdateViewCountProps = {
    slug: string;
};

export default function UpdateViewCount({ slug }: UpdateViewCountProps) {
    useEffect(() => {
        // API エンドポイントに POST リクエストを送信
        fetch('/api/update-view', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ slug })
        }).catch((err) => {
            console.error('View update error:', err);
        });
    }, [slug]);

    return null;
}
