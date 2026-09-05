import { cn } from '@/lib/utils'
import React from 'react'

function Container({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn("w-full max-w-5xl min-h-screen mx-auto px-8", className)}>
            {children}
        </div>
    )
}

export default Container;