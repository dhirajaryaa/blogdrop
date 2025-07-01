import Groq from "groq-sdk";
import { sendEmail } from "../helper/sendEmail.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

//* user selected relevant categories *//
const categories = [
    "System Design",
    "MERN",
    "AI",
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
export async function callAIagent({topic = "", userEmail}) {
    messageArray.push({
        role: "user",
        content: `Choose a single blog topic on "${topic}". then search on web related to topic view different site ,then Summarize the blog content, include examples or real-world simulations if possible, always add reference links, then send the complete content to user this ${userEmail} email address . return content must be MD-format and avoid, any email related information and only one email send.`
    });

    while (true) {
        const completion = await groq.chat.completions.create({
            messages: messageArray,
            model: "llama-3.3-70b-versatile",
            tools: [
                //! 1.  generate blog topic tool  
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
                //! 2. search on web related to given topic tool
                //! 3. send email
                {
                    type : 'function',
                    function : {
                        name: "sendEmail",
                        description : `send blog post in this ${userEmail} email address. i use resend for this.`,
                        parameters : {
                            properties : {
                                userEmail: {
                                    type:"string",
                                    description : "user email to deliver this blog post to that address"
                                },
                                subject : {
                                    type: 'string',
                                    description : "blog post title with today date and app name 'BlogDrop-'. (e.x: BlogDrop - test blog title, 24 may 2025) "
                                },
                                htmlContent : {
                                    type: 'string',
                                    description : "my full blog content here with reference link"
                                }
                            }
                        }
                    }
                }
                
            ]
        });
        messageArray.push(completion.choices[0].message);
        const toolCalls = completion.choices[0].message.tool_calls;

        if (!toolCalls) {            
            // console.log(`Blog post generated => ${completion.choices[0].message.content}`);
            // //! send email
            console.log("email sended..");
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
            if (functionName === "sendEmail") {
                result = await sendEmail(JSON.parse(functionArgs));
            };
            messageArray.push({
                role: 'tool',
                content: result,
                tool_call_id: tool.id
            });

        }
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

