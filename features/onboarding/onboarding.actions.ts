import { articleCategories } from "@/config/category";
import { db } from "@/db";
import { category as categoryTable } from "@/db/schema";
import { AppResponse } from "@/lib/types";

type InterestInput = string[];

export const saveInterest = async (
    interests: InterestInput,
): Promise<AppResponse<null>> => {
    // checking input 
    if (!interests?.length) {
        return {
            success: false,
            reason: "Interests are required.",
        };
    };

    const data = interests.flatMap((interest) => {
        const matchedCategory = articleCategories.find(
            (cat) => cat.value === interest,
        );

        if (!matchedCategory) return [];

        return [
            {
                name: matchedCategory.label,
                slug: matchedCategory.value,
            },
        ];
    });

    if (!data.length) {
        return {
            success: false,
            reason: "No valid interests found.",
        };
    };

    try {
        await db.transaction(async (tx) => {

            // user category table create it

            await tx
                .insert(categoryTable)
                .values(data)
                .onConflictDoNothing({
                    target: categoryTable.slug,
                });

            
        })

        return {
            success: true,
            data: null
        };
    } catch (error) {
        console.error("Failed to save interests:", error);

        return {
            success: false,
            reason: "Failed to save interests.",
        };
    }
};