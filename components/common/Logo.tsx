import { IconBrandTabler } from '@tabler/icons-react';
import Link from 'next/link';

export default function Logo({href = "/"}: {href?: string}) {
  return (
      <Link href={href} className="flex items-center gap-2 group">
          <div className="size-8 rounded-lg bg-linear-to-br from-primary to-primary/50 flex items-center justify-center shadow-glow-article">
              <IconBrandTabler className="size-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">BlogDrop</span>
      </Link>
  )
};