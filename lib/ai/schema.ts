import { z } from "zod"

// categories
export const CATEGORIES = [
    "AI",
    "Frontend",
    "Backend",
    "Mobile",
    "Cloud",
    "DevOps",
    "Database",
    "Security",
    "Performance",
    "Architecture",
    "System Design",
    "Distributed Systems",
    "Platform Engineering",
    "Developer Tools",
    "Observability",
    "Networking",
    "Data Engineering",
    "Testing",
    "Open Source",
    "Engineering Culture",
    "Case Study",
    "Best Practices",
    "Tutorial",
    "Career",
    "Product Engineering",
];
const categoryEnum = z.enum(CATEGORIES);

// tags
export const TAGS = [
    "javascript",
    "typescript",
    "python",
    "golang",
    "rust",
    "java",
    "csharp",
    "php",
    "ruby",
    "swift",
    "react",
    "nextjs",
    "vue",
    "angular",
    "svelte",
    "html",
    "css",
    "tailwindcss",
    "vite",
    "web-components",
    "nodejs",
    "express",
    "nestjs",
    "graphql",
    "rest-api",
    "grpc",
    "websockets",
    "authentication",
    "authorization",
    "api-design",
    "postgresql",
    "mysql",
    "mongodb",
    "redis",
    "sqlite",
    "elasticsearch",
    "orm",
    "database-design",
    "query-optimization",
    "caching",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "gcp",
    "terraform",
    "github-actions",
    "ci-cd",
    "serverless",
    "linux",
    "ai",
    "machine-learning",
    "deep-learning",
    "generative-ai",
    "llms",
    "rag",
    "ai-agents",
    "prompt-engineering",
    "embeddings",
    "vector-database",
    "system-design",
    "microservices",
    "distributed-systems",
    "event-driven",
    "message-queues",
    "architecture",
    "scalability",
    "high-availability",
    "fault-tolerance",
    "design-patterns",
    "testing",
    "performance",
    "security",
    "observability",
    "monitoring",
    "logging",
    "debugging",
    "refactoring",
    "clean-code",
    "code-quality",
    "case-study",
    "best-practices",
    "tutorial",
    "engineering-culture",
    "developer-experience",
    "developer-tools",
    "open-source",
    "product-engineering",
    "career",
    "interview",
];
const TagEnum = z.enum(TAGS);


export const metadataSchemaOpenAI = z.object({
    summary: z.string().describe("summary in 2-3 factual sentences, no marketing language."),
    tags: TagEnum.describe("select 3-7 items ONLY from the provided tag list. No duplicates."),
    categories: categoryEnum.describe("select 1-3 items ONLY from the provided category list."),
    keyTakeaways: z.array(z.string()).describe("3-5 standalone article insights."),
    difficulty: z.enum(["junior", "mid", "senior"]).describe("Article difficulty: junior(beginner / tutorial), mid(intermediate with trade - offs and multiple technologies), senior (architecture, scalability, distributed systems, production concerns)"),
    whyRead: z.string().describe("Generate a single natural-sounding recommendation sentence based only on the selected predefined category and matching tags"),
    author: z.string().describe("Author; fallback to company name.")
});


export const metadataJsonSchema = {
    type: "object",
    properties: {
        summary: {
            type: "string",
            description: "2–3 factual sentences summarizing the article."
        },
        tags: {
            type: "array",
            items: {
                type: "string",
                enum: TAGS
            },
            description: "Select 3–15 unique tags from the predefined tag list."
        },
        categories: {
            type: "array",
            items: {
                type: "string",
                enum: CATEGORIES
            },
            description: "Select 1–3 categories from the predefined category list."
        },
        keyTakeaways: {
            type: "array",
            items: {
                type: "string"
            },
            description: "Concise standalone insights from the article."
        },
        difficulty: {
            type: "string",
            enum: ["junior", "mid", "senior"],
            description:
                "junior = beginner/tutorial, mid = intermediate, senior = architecture, scalability, distributed systems, production."
        },
        whyRead: {
            type: "string",
            description: "One sentence explaining why an engineer should read this article."
        },
        author: {
            type: "string",
            description: "Authors name. If unavailable, use the company or publication name."
        }
    },

    required: [
        "summary",
        "tags",
        "categories",
        "keyTakeaways",
        "difficulty",
        "whyRead",
        "author"
    ]
};