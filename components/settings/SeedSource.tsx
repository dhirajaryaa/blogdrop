"use client";

import { seedSourcesOnDB } from "@/actions/seed-source";
import { VERIFIED_SOURCES } from "@/config/source";
import { useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { IconPackageImport } from "@tabler/icons-react";

export function SeedSourceBtn() {

    const [isPending, setIsPending] = useState<boolean>(false);

    //Todo: later on only admin see this feature 

    const handleSourceSeed = async () => {
        setIsPending(true);
        try {
            await seedSourcesOnDB(VERIFIED_SOURCES)
        } catch (error) {
            console.log("Source Not Seeded!");
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Button onClick={handleSourceSeed}>
            {isPending ? <Spinner /> :
                <IconPackageImport />}
            Seed Source
        </Button>
    )
};
