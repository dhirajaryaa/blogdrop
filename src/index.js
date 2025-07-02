import { blogTopicSelector, callAIagent } from "./agent/agent.js";
import { searchOnWeb } from "./helper/webSearch.js";

callAIagent({ userEmail: "draj22779@gmail.com" });

const categories = [
    " System Design",
    "Scalable Architecture",
    "Distributed Systems",
    "Real-World Engineering Case Studies"
];
// await blogTopicSelector({categories})

// await searchOnWeb("Scaling Stateful Serverless Architectures: A Deep Dive into Netflix's Adaptive Autoscaling Strategy for Real-Time Data Pipelines")