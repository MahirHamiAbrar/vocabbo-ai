import "dotenv/config";
import { VocabboAI } from "vocabbo-ai";

// "groq" is the default backend (free & faster resposne).
// But you can set it to "opanai" too.
const vai = new VocabboAI({
    ai_backend: 'groq',
    // api_key: process.env.GROQ_API_KEY, // automatically detected, no need to set
    // model_name: 'llama-3.3-70b-versatile' // default model for groq'
    // model_name: "gpt-4o-mini", // default model for opanai
});

const out = await vai.explain_word('tesseract', 'bangla');
console.log(out);