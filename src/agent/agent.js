import Groq from "groq-sdk";
import { sendEmail } from "../helper/sendEmail.js";
import { searchOnWeb } from "../helper/webSearch.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

//* user selected relevant categories *//
const categories = [
    " System Design",
    "Scalable Architecture",
    "Distributed Systems",
    "Real-World Engineering Case Studies"
];

const messageArray = [
    // defined role and work. 
    {
        "role": "system",
        "content": `You are BlogDrop, an expert AI assistant specialized in discovering and analyzing high-quality software engineering blogs. Your task is to help the user find insightful engineering content—such as deep system breakdowns, behind-the-scenes architecture, problem-solving case studies, and real-world engineering challenges—from platforms like Medium, Dev.to, Hacker News, engineering team blogs, and more. Your goal is to boost the user’s technical knowledge and skill set as an aspiring software engineer. currentDate: ${new Date().toISOString()}
}`
    }
];
export async function callAIagent({ userEmail }) {
    messageArray.push({
        role: "user",
        content: `Choose a single blog topic. then search on web related to blog topic,then web result include source and content so based on write blog content, you include examples or real-world simulations if possible, always add original reference links, then send the complete blog content to user this ${userEmail} email address .and avoid, any email related information and only one email send. blog content must me md format`
    });

    while (true) {
        try {
            const completion = await groq.chat.completions.create({
                messages: messageArray,
                model: "llama-3.1-8b-instant",
                tools: [
                    //! 1. blog topic selector tool
                    {
                        type: "function",
                        function: {
                            name: "blogTopicSelector",
                            description: `Generate a realistic and meaningful blog topic based on categories: ${categories.join(", ")}.`,
                            parameters: {
                                type: "object",
                                properties: {
                                    categories: {
                                        type: "array",
                                        items: { type: "string" },
                                        description: "User-selected blog categories"
                                    }
                                },
                                required: ["categories"]
                            }
                        }
                    },
                    //! 2. search on web tool
                    {
                        type: "function",
                        function: {
                            name: "searchOnWeb",
                            description: "Search the web in real time for the given blog topic and return a detailed summary including reference links.",
                            parameters: {
                                type: "object",
                                properties: {
                                    query: {
                                        type: "string",
                                        description: "Topic to search on the web"
                                    }
                                },
                                required: ["query"]
                            }
                        }
                    },
                    //! 3. send user email tool
                    {
                        type: "function",
                        function: {
                            name: "sendEmail",
                            description: `Send the generated blog post to this ${userEmail} using Resend.`,
                            parameters: {
                                type: "object",
                                properties: {
                                    userEmail: {
                                        type: "string",
                                        description: "User email address"
                                    },
                                    subject: {
                                        type: "string",
                                        description: "Subject like: BlogDrop - <Title>, <date>"
                                    },
                                    htmlContent: {
                                        type: "string",
                                        description: "Full blog content with reference links"
                                    }
                                },
                                required: ["userEmail", "subject", "htmlContent"]
                            }
                        }
                    }
                ]
            });
            messageArray.push(completion.choices[0].message);
            const toolCalls = completion.choices[0].message.tool_calls;

            if (!toolCalls) {
                // console.log(`Blog post generated => ${completion.choices[0].message.content}`);
                console.log("All work done");
                break;
            };
            //? check tool calling 
            for (const tool of toolCalls) {
                const functionName = tool.function.name;
                const functionArgs = tool.function.arguments || {};

                // blogTopicSelector tool run 
                let result = "";

                try {
                    if (functionName === "blogTopicSelector") {
                        result = await blogTopicSelector(JSON.parse(functionArgs));
                    }
                    if (functionName === "searchOnWeb") {
                        result = await searchOnWeb(JSON.parse(functionArgs));
                    };
                    if (functionName === "sendEmail") {
                        result = await sendEmail(JSON.parse(functionArgs));
                    }

                } catch (toolError) {
                    console.error(`❌ Tool ${functionName} failed:`, toolError);
                    result = `Tool ${functionName} failed to execute`;
                }
                messageArray.push({
                    role: 'tool',
                    content: JSON.stringify(result),
                    tool_call_id: tool.id
                });

            }
        } catch (error) {
            console.error("Groq Error:", error);
            break;
        }
    }

}

//? blog topic selector function 
export async function blogTopicSelector({ categories }) {
    console.log("generating topic ....");

    function pickRandomCategory() {
        const index = Math.floor(Math.random() * categories.length);
        return categories[index];
    }
    const completion = await groq.chat.completions.create({
        messages: [{
            role: "user",
            content: `You are a top-tier trend expert and technical content strategist for software engineers.
Selected category: ${pickRandomCategory()}
Generate 1 unique and trending blog title that:
- Reflects real-world engineering challenges
- Includes system breakdowns, infrastructure case studies, or deep technical insights
- Sounds like a title you'd find on Medium, Dev.to, or engineering blogs from Netflix, Uber, Stripe, etc.
- Is specific, not generic
- Matches current trends (2024-${new Date().getFullYear()})
Return the blog title only.
`
        }],
        model: "llama-3.1-8b-instant",
    });

    return completion.choices[0].message.content.trim();
};

