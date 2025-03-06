"use client";
/* eslint-disable */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon, CodeIcon, GamepadIcon, Globe, ExternalLink,TwitterIcon,SquareUser } from "lucide-react";

export default function About() {
    const skills = [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Rust",
        "Go"
    ];

    const hobbies = [
        {
            icon: <GamepadIcon className="w-4 h-4" />,
            name: "ゲーム",
            details: [
                { name: "League of Legends", type: "MOBA" },
                { name: "エロゲー", type: "Visual Novel" },

            ]
        },
        {
            icon: <CodeIcon className="w-4 h-4" />,
            name: "プログラミング",
            details: ["Web開発", "アプリ開発"]
        }
    ];

    const links = [
        { icon: <GithubIcon className="w-4 h-4" />, name: "GitHub", url: "https://github.com/yourusername" },
        {icon: <TwitterIcon className="w-4 h-4" />, name: "Twitter",url: "https://twitter.com/61233839281" },
        {icon: <SquareUser className="w-4 h-4" />,name:"Discord", url: "https://discordapp.com/users/1122179390403510335"}
    ];

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                About Me
            </h1>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-2xl">自己紹介</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                            わたくしの名は学芸大学です
                            ゲームとコーディングを愛するデベロッパー(へなちょこ)です。LoLでチームプレイの戦略(レスバ)を楽しみ、
                            エロゲーで物語に没頭し、そしてコードを書いて新しいものを作ることに情熱を注いでいます。
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-2xl">趣味</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            {hobbies.map((hobby) => (
                                <div key={hobby.name} className="space-y-2">
                                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
                                        {hobby.icon}
                                        <span className="font-medium">{hobby.name}</span>
                                    </div>
                                    <div className="ml-6">
                                        {Array.isArray(hobby.details) ? (
                                            <div className="flex flex-wrap gap-2">
                                                {hobby.details.map((detail, index) => (
                                                    typeof detail === 'string' ? (
                                                        <Badge key={index} variant="secondary">
                                                            {detail}
                                                        </Badge>
                                                    ) : (
                                                        <Badge key={detail.name} variant="secondary" className="flex items-center gap-1">
                                                            {detail.name}
                                                            <span className="text-xs opacity-70">({detail.type})</span>
                                                        </Badge>
                                                    )
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-2xl">Links</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            {links.map((link) => (
                                <Button
                                    key={link.name}
                                    variant="outline"
                                    size="sm"
                                    className="gap-2"
                                    onClick={() => window.open(link.url, '_blank')}
                                >
                                    {link.icon}
                                    {link.name}
                                    <ExternalLink className="w-3 h-3" />
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="text-2xl">スキル</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-sm">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}