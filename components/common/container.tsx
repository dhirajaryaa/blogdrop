import { cn } from '@/lib/utils'
import React from 'react'

export const Container = ({ className, children }: { className?: string, children: React.ReactNode }) => {
    return (
        <div className={cn("max-w-7xl mx-auto px-4 md:px-8", className)}>
            {children}
        </div>
    )
};