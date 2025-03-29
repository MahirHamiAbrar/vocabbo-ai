import "dotenv/config";
import { VocabboAI, VocabboImageGenAI, download_image } from "vocabbo-ai";

const vai = new VocabboAI({
    ai_backend: 'groq'
});

const img_prompt = await vai.create_image_gen_prompt(
    'tesseract', 
    'Physicists use the concept of the tesseract to understand higher-dimensional spaces.'
);
console.log(img_prompt);

const vai_img = new VocabboImageGenAI();
const data = await vai_img.generate_image_url(img_prompt);
console.log(data);

const image_url = data[0].url;
await download_image(image_url, 'tesseract.png');
