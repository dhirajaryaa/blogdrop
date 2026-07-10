import Link from 'next/link';

export default function Logo({ href = "/" }: { href?: string }) {
    return (
        <Link href={href} className="flex items-center gap-2 group">
            <img loading='eager' src={"/logo.png"} alt="Logo" className="size-8 rounded-lg" />
            <span className="text-[20px] font-bold tracking-tight">BlogDrop</span>
        </Link>
    )
};