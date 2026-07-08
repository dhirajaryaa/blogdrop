import UserProfile from "../common/UserProfile";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

function AppHeader() {
    return (
        <header className="flex sticky top-0 inset-x-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-xl border-b border-border/50 w-full">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 w-full">
                <div className="flex items-center">
                    <SidebarTrigger variant={"ghost"} size={"icon-lg"} className="-ml-1 [&_svg:not([class*='size-'])]:size-6" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-8"
                    />
                    <div className="text-xl ml-2 font-semibold text-foreground tracking-wide">Feed</div>
                </div>

                <UserProfile />
            </div>
        </header>
    )
}

export default AppHeader
