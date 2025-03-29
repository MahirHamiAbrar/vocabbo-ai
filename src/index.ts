import "dotenv/config";

import * as types from "./types";
import * as modelConfig from "./model_config";

import { BaseAIModel } from "./base_model";
import { VocabboAI, VocabboImageGenAI } from './vocabboai';
import { download_image, save_base64_image } from "./utils";

export {
    BaseAIModel,
    VocabboAI, 
    VocabboImageGenAI,

    download_image,
    save_base64_image,

    types,
    modelConfig
};

`
const vai = new VocabboAI({
    ai_backend: 'groq',
});

// const out = await vai.explain_word('hello', 'bangla');
// console.log(out);

const img_prompt = await vai.create_image_gen_prompt(
    'hello', 
    'The automated voice on the computer said hello before starting the instructions.'
);
console.log(img_prompt);

const vai_img = new VocabboImageGenAI();
const data = await vai_img.generate_image_url(img_prompt);
console.log(data);
// await vai_img.generate_image_base64({
//     prompt: img_prompt,
//     response_format: 'b64_json',
//     n: 1,
//     size: '512x512'
// }).then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.error(err);
//     process.exit(1);
// });
`
