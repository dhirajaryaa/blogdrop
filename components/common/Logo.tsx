import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ href = "/" }: { href?: string }) {
    return (
        <Link href={href} className="flex items-center gap-2 group">
            <Image
                src="/logo.png"
                alt="BlogDrop"
                width={32}
                height={32}
                className="rounded-lg"
                priority
            />
            <span className="text-[20px] font-bold tracking-tight">BlogDrop</span>
        </Link>
    )
};