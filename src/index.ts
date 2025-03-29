import "dotenv/config";
import { VocabboAI } from './vocabboai'; // Adjust the path as needed

const vai = new VocabboAI({
    ai_backend: 'groq',
});

const out = await vai.explain_word('hello', 'bangla');
console.log(out);
