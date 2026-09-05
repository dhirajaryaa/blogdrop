
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IconArrowRight } from "@tabler/icons-react"

function Hero() {
    return (
        <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col gap-2 mt-20 ">
                <div className="flex w-full flex-col gap-4">
                    <div className="space-y-2 max-w-lg">
                        <h1 className="text-3xl font-semibold tracking-wide sm:text-5xl">
                            Discover better, engineering articles.
                        </h1>

                        <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                            Curated technical stories from the teams building what’s next.
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Button variant={"link"} className="hover:no-underline hover:text-blue-600 px-0" asChild>
                            <Link href="/feed">Start reading <IconArrowRight stroke={2} /> </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero