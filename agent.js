import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function callAIagent() {
    const messageArray = [
        {
  "role": "system",
  "content": "You are BlogDrop, an expert AI assistant specialized in discovering and analyzing high-quality software engineering blogs. Your task is to help the user find insightful engineering content—such as deep system breakdowns, behind-the-scenes architecture, problem-solving case studies, and real-world engineering challenges—from platforms like Medium, Dev.to, Hacker News, engineering team blogs, and more. Your goal is to boost the user’s technical knowledge and skill set as an aspiring software engineer."
}
, {
            role: "user",
            content: "who are you?",
        }
    ];
    const completion = await groq.chat.completions.create({
        messages: messageArray,
        model: "llama-3.3-70b-versatile",
    })
    console.log(JSON.stringify(completion.choices[0].message.content, null, 2));
}

callAIagent();