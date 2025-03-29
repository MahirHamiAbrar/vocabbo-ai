import "dotenv/config";
import { VocabboAI, VocabboImageGenAI, download_image } from "vocabbo-ai";

// Create VocabboAI instance.
const vai = new VocabboAI({
    ai_backend: 'groq',
});

// specify your word and language
const word = "heliosphere";
const language = "bangla";

// generate word meaning
const meaning = await vai.explain_word(word, language);
console.log('Word Meaning: ', meaning);

// VocabboAI by default generates 5 sentences (fixed amount for now). Take any one of them as context sentence for image generation.
const context_sentence = meaning.examples[0].en;
console.log("Generating image for this senctence: \n", context_sentence);

// generate image generation prompt for DALL-E
const img_prompt = await vai.create_image_gen_prompt(
    word, 
    context_sentence
);
console.log('Image Generation Prompt: ', img_prompt);

// generate image using DALL-E
const vai_img = new VocabboImageGenAI();
const data = await vai_img.generate_image_url(img_prompt);
console.log('Image Data: ', data);

// download and save the image
const image_url = data[0].url;
console.log('Downloading Image...\n');
await download_image(image_url, `${word}.png`);