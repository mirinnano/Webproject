import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';

type PostProps = {
    params: Promise<{ slug: string }>;  // ✅ Promise を外して同期的なオブジェクトに修正
}

async function getPost(params: string) {
    try {
        const slug = await params;
        const filePath = path.join(process.cwd(), 'app/posts', `${slug}.md`);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter, content } = matter(fileContents);
        return { frontmatter, content };
    } catch (error) {
        return null;
    }
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export default async function Post({ params }: PostProps) {  // ✅ 型を修正
    const post = await getPost((await params).slug);  // ✅ `params.slug` を直接取得
    if (!post) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <Card className="shadow-2xl rounded-2xl overflow-hidden border dark:border-gray-700">
                {/* ヘッダー部分 */}
                <CardHeader className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b dark:border-gray-700">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {post.frontmatter.tags?.map((tag: string) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="text-sm px-3 py-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <CardTitle className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                        {post.frontmatter.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-2">
                        <span className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            {formatDate(post.frontmatter.date)}
                        </span>
                        {post.frontmatter.readingTime && (
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {post.frontmatter.readingTime}
                            </span>
                        )}
                    </div>
                </CardHeader>

                {/* コンテンツ部分 */}
                <CardContent className="prose dark:prose-invert max-w-none px-6 py-8">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            h1: ({ node, ...props }) => <h1 className="text-4xl font-bold my-4" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-3xl font-bold my-3 border-b pb-1" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-2xl font-bold my-2" {...props} />,
                            img: ({ src, alt }) => (
                                <Image
                                    src={src?.startsWith('/') ? src : `/${src}`}
                                    alt={alt || ''}
                                    width={300}
                                    height={400}
                                    className="rounded-lg shadow-md my-4"
                                />
                            )
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </CardContent>
            </Card>
        </div>
    );
}
