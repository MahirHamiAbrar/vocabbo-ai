# VocabboAI
Uses OpenAI/Groq/Gemini in the backend to generate word meanings and DALL-E FOR generating images.

# First Steps
First clone this GitHub Repo:
```bash
git clone https://github.com/MahirHamiAbrar/vocabbo-ai.git
```

Then Install this package to use this as a library:
```bash
npm install path/to/your/vocabbo-ai-folder
```

You are all set.

# Usage

## Generating Word Meanings
```typescript
import "dotenv/config";

import { VocabboAI } from "vocabbo-ai";

const vai = new VocabboAI({
    ai_backend: 'groq',
});

const out = await vai.explain_word('hello', 'bangla');
console.log(out);
```

Parameters of `VocabboAI()`:

 * `ai_backend`: `groq` | `openai`
 
 * `api_key`: Optional. automatically collects from environment variables.
 
 * `model_name`: Optional. The name of the model you want to use.

Parameters of `VocabboAI.explain_word()`:
 * `word`: The word you want you get meaning of
 * `language`: The language you want to get meaning in.

VocabboAI will always take `ENGLISH` words and translate them in the given language.


## Generating Images
```typescript
import "dotenv/config";

import { VocabboImageGenAI } from "vocabbo-ai";

const img_prompt = await vai.create_image_gen_prompt(
    'hello', 
    'The automated voice on the computer said hello before starting the instructions.'
);
console.log(img_prompt);

const vai_img = new VocabboImageGenAI();
const data = await vai_img.generate_image_url(img_prompt);
console.log(data);
```

Parameters of `VocabboImageGenAI.create_image_gen_prompt()`:
 * `word`: The user-input word for the context
 * `language`: An AI generated sentence.


By defalt OpenAI generates image URL which contains the image. The URL expires within 60 minutes. So the image must be downloaded within this time period.


# Full Example Usage
```typescript
import "dotenv/config";

import { VocabboAI, VocabboImageGenAI } from "vocabbo-ai";

const vai = new VocabboAI({
    ai_backend: 'groq',
});

const out = await vai.explain_word('hello', 'bangla');
console.log(out);

console.log("generating image for this senctence: \n", out.examples[0].en);

const img_prompt = await vai.create_image_gen_prompt(
    'hello', 
    out.examples[0].en
);
console.log(img_prompt);

const vai_img = new VocabboImageGenAI();
const data = await vai_img.generate_image_url(img_prompt);
console.log(data);
```


# TODO
The documentation will updated with more details shortly.