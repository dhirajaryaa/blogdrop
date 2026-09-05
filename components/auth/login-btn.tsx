"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth/auth-client';
import { authCallbackPath } from '@/config/constant';
import { IconBrandGithub, IconBrandGoogleFilled } from '@tabler/icons-react';
import { toast } from 'sonner';

type LoginBtnProps = {
    type: "google" | "github",
}


function LoginBtn({ type }: LoginBtnProps) {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    //? auth function
    async function authHandle({ type }: LoginBtnProps) {
        try {
            await authClient.signIn.social({
                provider: type,
                callbackURL: authCallbackPath
            },
                {
                    onRequest: (ctx) => {
                        setIsLoading(true);
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message);
                    }
                });
        } catch (error: any) {
            toast.error("Unable to sign in. Please try again.");
            console.error(error);
            return;
        }
    }


    return (
        type === "google" ?
            <>
                <Button onClick={() => authHandle({ type: "google" })} disabled={isLoading} aria-busy={isLoading} className="h-11 w-full gap-2 text-sm">
                    {isLoading ? <>
                        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Connecting to Google...
                    </> : <>
                        <IconBrandGoogleFilled className="size-4" />
                        Continue with Google
                    </>
                    }
                </Button>
            </> :
            <>
                <Button onClick={() => authHandle({ type: "github" })} disabled={isLoading} aria-busy={isLoading} variant="outline" className="h-11 w-full gap-2 text-sm">
                    {isLoading ? <>
                        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Connecting to GitHub...
                    </> : <>
                        <IconBrandGithub className="size-4" />
                        Continue with GitHub
                    </>}
                </Button>
            </>
    )
}

export default LoginBtn;