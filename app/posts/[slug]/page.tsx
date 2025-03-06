/* eslint-disable */
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, Eye } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';
import UpdateViewCount from "@/app/components/UpdateViewCount";

type PostProps = {
    params: Promise<{ slug: string }>;
};

async function fetchPost(slug: string) {
    const response = await fetch(`http://localhost:3000/api/posts/${slug}`);
    if (!response.ok) {
        return null;
    }
    return response.json();
}

async function generateToc(content: string) {
    const headings = [];
    const regex = /^(#{1,3})\s+(.*)$/gm;  // #, ##, ### の見出しにマッチ
    let match;

    while ((match = regex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2];
        const id = text.toLowerCase().replace(/\s+/g, '-');

        headings.push({
            level,
            text,
            id,
        });
    }

    return headings;
}

export default async function Post({ params }: PostProps) {
    const post = await fetchPost((await params).slug);
    if (!post) {
        notFound();
    }

    const toc = await generateToc(post.content);
    async function fetchRelatedPosts(tags: string[]) {
        const response = await fetch(`http://localhost:3000/api/related-posts?tags=${tags.join(',')}`);
        if (!response.ok) {
            return [];
        }
        return response.json();
    }

    async function fetchRandomPosts() {
        const response = await fetch(`http://localhost:3000/api/posts/random`);
        if (!response.ok) {
            return [];
        }
        return response.json();
    }

    const relatedPosts = await fetchRelatedPosts(post.frontmatter.tags);
    const randomPosts = await fetchRandomPosts();

    function formatDate(date: string) {
        return new Date(date).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    return (
        <>
            <head>
                <script async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7251276119313924"
                        crossOrigin="anonymous"></script>
                <title>{post.title}</title>
            </head>

            <UpdateViewCount slug={(await params).slug} />
            <div className="container mx-auto px-4 py-10 flex flex-col gap-8">
                {/* 記事コンテンツ */}
                <div className="w-full article-content">
                    <Card className="shadow-2xl rounded-2xl overflow-hidden border dark:border-gray-700">
                        <CardHeader className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b dark:border-gray-700">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {post.frontmatter.tags?.map((tag: string) => (
                                    <Badge key={tag} variant="secondary"
                                           className="text-sm px-3 py-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                            <CardTitle className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">
                                {post.frontmatter.title ?? 'Untitled'}
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
                                <span className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    {post.frontmatter.views} views
                                </span>
                            </div>
                        </CardHeader>

                        <CardContent className="prose dark:prose-invert max-w-none px-6 py-8">
                            {/* 目次 */}
                            <div className="toc bg-gray-100 p-4 rounded-lg shadow-md mb-8">
                                <h2 className="text-2xl font-semibold mb-4 text-center">目次</h2>
                                <ul className="space-y-2">
                                    {toc.map((item) => (
                                        <li key={item.id} className={`pl-${item.level * 2}`}>
                                            <a href={`#${item.id}`} className="hover:text-gray-900">
                                                {item.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* 記事内容 */}
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    h1: ({ node, ...props }) => {
                                        const children = props.children;
                                        const id = typeof children === 'string' ? children.toLowerCase().replace(/\s+/g, '-') : '';
                                        return <h1 className="text-4xl font-bold" id={id} {...props} />;
                                    },
                                    h2: ({ node, ...props }) => {
                                        const children = props.children;
                                        const id = typeof children === 'string' ? children.toLowerCase().replace(/\s+/g, '-') : '';
                                        return <h2 className="text-3xl font-semibold my-6" id={id} {...props} />;
                                    },
                                    h3: ({ node, ...props }) => {
                                        const children = props.children;
                                        const id = typeof children === 'string' ? children.toLowerCase().replace(/\s+/g, '-') : '';
                                        return <h3 className="text-2xl font-semibold my-6" id={id} {...props} />;
                                    },
                                    h4: ({ node, ...props }) => {
                                        const children = props.children;
                                        const id = typeof children === 'string' ? children.toLowerCase().replace(/\s+/g, '-') : '';
                                        return <h3 className="text-xl font-normal my-4" id={id} {...props} />;
                                    },
                                    img: ({ src, alt }) => (
                                        <Image
                                            src={src || ""}
                                            alt={alt || ''}
                                            width={500}
                                            height={550}
                                            className="rounded-lg shadow-md my-4"
                                        />
                                    ),
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </CardContent>
                    </Card>

                    {/* ランダム記事 */}
                    <div className="mt-10">
                        <h3 className="text-2xl font-semibold mb-4">次読むべき記事</h3>
                        <div className="space-y-4">
                            {randomPosts.map((randomPost: any) => (
                                <Card key={randomPost.slug} className="shadow-md rounded-lg overflow-hidden">
                                    <CardHeader className="bg-gray-50 dark:bg-gray-800 px-6 py-4">
                                        <CardTitle
                                            className="text-xl font-semibold">{randomPost.frontmatter.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{randomPost.frontmatter.excerpt}</p>
                                        <a href={`/posts/${randomPost.slug}`}
                                           className="text-blue-600 hover:underline">続きを読む</a>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
