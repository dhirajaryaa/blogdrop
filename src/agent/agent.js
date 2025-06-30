import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

//* user selected relevant categories *//
const categories = [
    "MERN",
    "AI",
    "System Design",
    "Interview Preparation"
];

export async function callAIagent(topic) {
    const messageArray = [
        // defined role and work. 
        {
            "role": "system",
            "content": `You are BlogDrop, an expert AI assistant specialized in discovering and analyzing high-quality software engineering blogs. Your task is to help the user find insightful engineering content—such as deep system breakdowns, behind-the-scenes architecture, problem-solving case studies, and real-world engineering challenges—from platforms like Medium, Dev.to, Hacker News, engineering team blogs, and more. Your goal is to boost the user’s technical knowledge and skill set as an aspiring software engineer. currentDate: ${new Date().getUTCDate()}`
        }
        , {
            role: "user",
            content: `generate blog on ${topic || categories}`
        }
    ];
    const completion = await groq.chat.completions.create({
        messages: messageArray,
        model: "llama-3.3-70b-versatile",
        tools: [
            //! generate blog topic tool  
            {
                type: 'function',
                function: {
                    name: "blogTopicSelector",
                    description: `if user topic not given so make pic one categories on those categories and then generate a realistic and meaningful blog & arctics topic`,
                    parameters: {
                        type: "object",
                        properties: {
                    topic: {
                        type: 'string',
                        description: "Topic provided by the user. If present, use this for blog & articles."
                    },
                    categories: {
                        type: 'array',
                        items: { type: "string" },
                        description: "List of categories based on user's interests. Use this if topic is missing."
                    }
                },
                        required : [] // this is parameters options if required empty.
                    }
                }
            },
             //! search on web related to given topic tool
            {
                type: 'function',
                function: {
                    name: "searchOnWeb",
                    description: "fated related to given topic engineering blogs & articles and references."
                }
            }
        ]
    });
    //* result log 
    // console.log(JSON.stringify(completion.choices, null, 2));
    
    const toolCalls = completion.choices[0].message.tool_calls;
    if(!toolCalls){
        // in reality send user email on this content 
        console.log(`Blog post generated => ${completion.choices[0].message.content}`);
        return ;
    };
    //? check tool calling 
    for (const tool of toolCalls){
        const functionName = tool.function.name;
        const functionArgs = tool.function.arguments;
        if(functionName === "blogTopicSelector"){
            // function run for generating relevant blog topic
            const res = await blogTopicSelector(JSON.parse(functionArgs));
            console.log(JSON.stringify(res,null,2));
            
        }
    }
}


async function blogTopicSelector({topic, categories}) {
    console.log("generating topic ....");
const completion = await groq.chat.completions.create({
    messages: [{
        role: "user",
        content: `Select one category from the following: ${categories}. Suggest a single, specific, high-quality engineering blog topic (just the topic title, no explanation) that would be valuable for software engineers. Only return the topic title.`
    }],
    model: "llama-3.3-70b-versatile",
});
    return completion.choices[0].message.content

};
async function searchOnWeb(query) {
    console.log("search on web....");
    return query
};