export function formatAuthors(author: string) {
    const authors = author.split(",").map((a) => a.trim()).filter(Boolean)
    if (authors.length === 0) return null
    const first = authors[0]
    const truncated = first.length > 20 ? first.slice(0, 20).trimEnd() + "…" : first
    const extra = authors.length - 1
    return extra > 0 ? `${truncated} +${extra} more` : truncated
}
