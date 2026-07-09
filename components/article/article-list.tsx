"use client";

import { getArticles } from "@/actions/feed";
import { useSidebar } from "../ui/sidebar";
import { ArticleCard } from "./ArticleCard";

type Articles = Awaited<ReturnType<typeof getArticles>>[number];

function ArticlesList({ articles }: { articles: Articles[] }) {

    return (
        <section
            className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]"
        >
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </section>
    )
}

export default ArticlesList
