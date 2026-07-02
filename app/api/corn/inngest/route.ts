import { inngest } from "@/inngest/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    try {
        const code = process.env.INNGEST_SECRET_CODE!;

        console.log("inngest function trigger");


        if (!code) return;


        const task = await inngest.send({
            name: "cron/refresh-Source",
            data: {}
        });


        console.log(task);



    } catch (error) {
        console.error("inngest trigger error:", error);
        return NextResponse.json({ ok: false })
    }


    return NextResponse.json({ ok: true }, { status: 200 });

}