import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    description?: string;
    tags?: string[];
    readingTime?: string;
  };
}

async function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'app/posts');
  const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });

  const files = entries
      .filter(entry => entry.isFile() && path.extname(entry.name) === '.md')
      .map(entry => entry.name);

  const posts = files.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter } = matter(fileContents);

    return {
      slug: filename.replace('.md', ''),
      frontmatter
    };
  });

  return posts.sort((a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}
// 日付のフォーマット関数
function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function Home() {
  const posts = await getPosts();

  return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* ヘッダーセクション */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Blog Posts
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            プログラミング、ゲーム、技術についての記事
          </p>
        </div>

        {/* 記事一覧 */}
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post: Post) => (
              <Card key={post.slug} className="group hover:shadow-lg transition-shadow duration-200">
                <Link href={`/posts/${post.slug}`}>
                  <CardHeader>
                    <CardTitle className="group-hover:text-blue-600 transition-colors duration-200">
                      {post.frontmatter.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {post.frontmatter.description && (
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {post.frontmatter.description}
                        </p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.frontmatter.tags?.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center gap-4">
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
                    <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform duration-200">
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Link>
              </Card>
          ))}
        </div>

      </div>

  );
}