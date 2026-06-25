# BlogDrop

AI-powered engineering blog aggregator that helps developers discover, track, and learn from the best engineering content across the web.

## 🚀 Overview

BlogDrop collects articles from top engineering blogs, removes duplicates, extracts key topics using AI, and delivers a personalized feed tailored to each developer's interests.

Instead of manually checking dozens of company blogs, developers get a single place to discover high-quality engineering content.

## ✨ Features

* 📡 Aggregate content from multiple RSS sources
* 🤖 AI-powered topic extraction
* 🏷️ Automatic article tagging
* 🔍 Smart search and filtering
* 👤 Personalized content recommendations
* 📈 Trending topics detection
* 📬 Daily digest emails
* 🚫 Duplicate article removal
* 📚 Save articles for later reading

## 🏗️ Architecture

```text
RSS Sources
    ↓
Content Collector
    ↓
Deduplication Engine
    ↓
AI Processing
    ↓
Topic Extraction
    ↓
Interest Matching
    ↓
PostgreSQL
    ↓
Personalized Feed
    ↓
Daily Digest
```

## 🎯 Problem

Developers follow dozens of engineering blogs:

* Netflix
* Uber
* Stripe
* Cloudflare
* Meta
* Spotify
* AWS
* Dropbox

Keeping up with all of them is difficult and time-consuming.

## 💡 Solution

BlogDrop automatically collects, analyzes, and personalizes engineering content so developers can focus on learning instead of searching.

## 🛠️ Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui

### Backend

* Next.js API Routes
* PostgreSQL
* Drizzle ORM

### AI

* OpenAI / Gemini
* Embeddings
* Topic Classification

### Infrastructure

* Vercel
* Cron Jobs
* RSS Feed Processing

## 🎯 MVP Goals

* Collect articles from 10+ engineering blogs
* AI-generated topics and tags
* Personalized feed
* Search functionality
* Daily digest

## 🔮 Future Roadmap

* Browser extension
* Weekly AI summaries
* Team knowledge feeds
* Trending engineering dashboards
* AI-powered article recommendations
* Podcast and YouTube support

## License

MIT
