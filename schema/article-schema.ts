import { z } from "zod";

// bookmark 
const bookmarkInput = z.object({
    articleId: z.uuid({ error: "Invalid Article Id" })
})



// globe export 
export {bookmarkInput}