import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

//* user selected relevant categories *//
const categories = [
    "MERN",
    "AI",
    "System Design",
    "Interview Preparation"
];

const messageArray = [
    // defined role and work. 
    {
        "role": "system",
        "content": `You are BlogDrop, an expert AI assistant specialized in discovering and analyzing high-quality software engineering blogs. Your task is to help the user find insightful engineering content—such as deep system breakdowns, behind-the-scenes architecture, problem-solving case studies, and real-world engineering challenges—from platforms like Medium, Dev.to, Hacker News, engineering team blogs, and more. Your goal is to boost the user’s technical knowledge and skill set as an aspiring software engineer. currentDate: ${new Date().toISOString()}
}`
    }
];
export async function callAIagent(topic = "") {
    messageArray.push({
        role: "user",
        content: `Choose a single blog topic on "${topic}". then search on web related to topic view different site ,then Summarize the blog content in 700-800 words, include examples or real-world simulations if possible, always add reference links, then send the complete content to my email.`
    });

    while (true) {
        const completion = await groq.chat.completions.create({
            messages: messageArray,
            model: "llama-3.3-70b-versatile",
            tools: [
                //! generate blog topic tool  
                {
                    type: 'function',
                    function: {
                        name: "blogTopicSelector",
                        description: `generate a realistic and meaningful blog & arctics topic based on those ${categories.join()}.`,
                        parameters: {
                            type: "object",
                            properties: {
                                categories: {
                                    type: 'array',
                                    items: { type: "string" },
                                    description: "List of categories based on user's interests."
                                }
                            }
                        }
                    }
                },
                //! search on web related to given topic tool
                // {
                //     type: 'function',
                //     function: {
                //         name: "searchOnWeb",
                //         description: "fated related to given topic engineering blogs & articles and references."
                //     }
                // }
            ]
        });
        messageArray.push(completion.choices[0].message);
        const toolCalls = completion.choices[0].message.tool_calls;

        if (!toolCalls) {
            // in reality send user email on this content 
            console.log(`Blog post generated => ${completion.choices[0].message.content}`);
            break;
        };
        //? check tool calling 
        for (const tool of toolCalls) {
            const functionName = tool.function.name;
            const functionArgs = tool.function.arguments;
            // blogTopicSelector tool run 
            let result = "";
            if (functionName === "blogTopicSelector") {
                result = await blogTopicSelector(JSON.parse(functionArgs));
            };
            messageArray.push({
                role: 'tool',
                content: result,
                tool_call_id: tool.id
            });

        }

        console.log("====================================");
        console.log("messages", messageArray);
    }
}

//? blog topic selector function 
async function blogTopicSelector({ categories }) {
    console.log("generating topic ....");
    const completion = await groq.chat.completions.create({
        messages: [{
            role: "user",
            content: `Select one category randomly from the following: ${categories?.join()}.No duplicate,always chose different category, Suggest a single, specific, high-quality engineering blog topic (just the topic title, no explanation) that would be valuable for software engineers. Only return the topic title.`
        }],
        model: "llama-3.3-70b-versatile",
    });
    return completion.choices[0].message.content
};




async function searchOnWeb(query) {
    console.log("search on web....");
    return "this is search on web result"
};
// console.log("log",messageArray);
