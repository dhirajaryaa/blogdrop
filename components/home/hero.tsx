import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react"
import Link from "next/link"

export const Hero = () => {
    return (
        <div className="flex flex-col px-4 py-2 relative">
            <div className="mx-auto flex max-w-3xl flex-col items-center py-26 text-center">
                <h1 className="text-4xl font-medium tracking-tight sm:text-5xl leading-tight">
                    Discover the best engineering blogs, personalized for you.
                </h1>
                <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
                    Cut through the noise.
                    Discover something worth learning every day.
                </p>
                <Link href={"/feed"} className={"mt-8 flex items-center gap-2 px-4 py-2 text-white bg-[#2579F4] rounded-lg shadow-lg text-shadow-md font-medium text-sm tracking-wide"} >
                    Explore Feed <IconArrowUpRight stroke={1.5} size={18}/>
                </Link>
               
            </div>

        </div>
    )
}