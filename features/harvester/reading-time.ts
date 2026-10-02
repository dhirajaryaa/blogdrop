export function calculateReadingTime(content: string): number {
    const words = content
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

    return Math.max(1, Math.ceil(words / 200));
}