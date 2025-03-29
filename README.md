# VocabboAI
Uses `OpenAI`/`Groq`/`Gemini` in the backend to generate word meanings and DALL-E for generating images.

# First Steps
First clone this GitHub Repo:
```bash
git clone https://github.com/MahirHamiAbrar/vocabbo-ai.git
```

Then install this repo to use it as a library:
```bash
npm install path/to/your/vocabbo-ai-folder
```

Then create a `.env` file in your project directory. The file should contain the variables present in the [.env.example](./.env.example) file.

Get your API key from the below links:
 - Groq: https://console.groq.com/keys
 - OpenAI: https://platform.openai.com/api-keys
 - Gemeni: https://ai.google.dev/gemini-api/docs/api-key

<hr>

`NOTE:` Having all three API keys is not mandatory. But you must have at lease ONE of those API keys to generate texts. ***For image generation, having OpenAI API key is MUST.***
<hr>

You are all set! Now time to use this 

# Usage

## Generating Word Meanings
Source: [word_meaning_example.ts](./examples/word_meaning_example.ts)
```typescript
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
```
<summary>
Parameters documenation used in this example:
<details>

Parameters of `VocabboAI()`:

 * `ai_backend`: `groq` | `openai`
 
 * `api_key`: Optional. automatically collects from environment variables.
 
 * `model_name`: Optional. The name of the model you want to use.

Parameters of `VocabboAI.explain_word()`:
 * `word`: The word you want you get meaning of
 * `language`: The language you want to get meaning in.

</details>

VocabboAI will always take `ENGLISH` words and translate them in the given language.

JSON Output of the above code:
<details>

```bash
{
  explanation: {
    en: 'A tesseract is a four-dimensional cube, the analog of a cube in three-dimensional space, and the extension of a square in two-dimensional space.',
    native: 'টেসার্যাক্ট হল চার-মাত্রিক ঘনক, ত্রি-মাত্রিক স্থানের একটি ঘনকের সমতুল্য এবং দুই-মাত্রিক স্থানের একটি বর্গক্ষেত্রের এক্সটেনশন।'
  },
  examples: [
    {
      en: 'The concept of a tesseract is used in science fiction to describe a way of moving through higher dimensions.',
      native: 'টেসার্যাক্টের ধারণাটি ব্যবহার করা হয় বৈজ্ঞানিক কল্পনায় উচ্চতর মাত্রার মধ্য দিয়ে চলাচল করার একটি উপায় বর্ণনা করতে।'
    },
    {
      en: 'The tesseract is a mathematical concept that can be difficult to visualize.',
      native: 'টেসার্যাক্ট হল একটি গাণিতিক ধারণা যা কল্পনা করা কঠিন হতে পারে।'
    },
    {
      en: 'In the movie Interstellar, the tesseract is a four-dimensional construct that allows for time travel.',
      native: 'ইন্টারস্টেলার সিনেমায়, টেসার্যাক্ট একটি চার-মাত্রিক কাঠামো যা সময় ভ্রমণের অনুমতি দেয়।'
    },
    {
      en: 'The tesseract is a geometric shape that has eight cubic cells.',
      native: 'টেসার্যাক্ট হল একটি জ্যামিতিক আকার যার আটটি ঘনক ঘর রয়েছে।'
    },
    {
      en: 'Physicists use the concept of the tesseract to understand higher-dimensional spaces.',
      native: 'পদার্থবিদরা উচ্চতর-মাত্রিক স্থানগুলি বুঝতে টেসার্যাক্টের ধারণাটি ব্যবহার করেন।'
    }
  ]
}
```

</details>
</summary>


## Generating Images
Source: [image_gen_example.ts](./examples/image_gen_example.ts)
```typescript
import "dotenv/config";
import { VocabboAI, VocabboImageGenAI } from "vocabbo-ai";

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
```

<summary>
Parameters documenation used in this example:
<details>

Parameters of `VocabboImageGenAI.create_image_gen_prompt()`:
 * `word`: The user-input word for the context
 * `language`: An AI generated sentence.
</details>

By defalt OpenAI generates image URL which contains the image. **The URL expires within 60 minutes.** So the image must be downloaded within this time period.

Output of the above example code:
<details>

Output for `console.log(img_prompt);`:
```plaintext
A detailed, illuminated tesseract, also known as an 8-cell or octachoron, floating in a dark, starry space, with its intricate structure of 8 cubic cells visible, and physicists in the background studying and analyzing the higher-dimensional shape on a blackboard filled with complex mathematical equations, with the tesseract's cells glowing softly to highlight its complex geometry.
```

Output for `console.log(data);`: (JSON data)
```bash
[
  {
    revised_prompt: "A detailed, illuminated tesseract, commonly known as an 8-cell or octachoron, hovers in a dark, starry expanse. This intricate structure, composed of 8 cubic cells, is visible and luminesces softly to emphasize its complex geometry. In the background, a group of astrophysicists, including a South Asian man, a Black woman, a Caucasian woman, and a Middle-Eastern man, study and analyze the higher-dimensional shape. A blackboard filled with complex mathematical equations pertaining to the shape's properties occupies their attention.",
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-IhQA8HrlaVmpi9josHXuqSen/user-A2l4hPsKEH8I9NbyBxyJZsog/img-kNeu6tBMJt7Zdfi4vq0L9YkW.png?st=2025-03-29T18%3A09%3A26Z&se=2025-03-29T20%3A09%3A26Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-29T10%3A34%3A04Z&ske=2025-03-30T10%3A34%3A04Z&sks=b&skv=2024-08-04&sig=7iuMvmFk4i0jJX3o1ZkI9Uhe%2BdR%2BjdxtAe1XDxa9imc%3D'
  }
]
```

</details>
</summary>

VocabboAI provides a downlaod function, to downlaod the image and save it in `png` format.

Here is the code for it:
```typescript
import { download_image } from "vocabbo-ai";

// below data variable refers to the data variable mentioned in the previous example code.
const image_url = data[0].url;
await download_image(image_url, 'tesseract.png');
```

You can also manually download the image from the URL. 

**NOTE: The URL expires within 60 minutes.**

<summary>
The generated image looks something like this:
<details>

Image File: [tesseract.png](./images/tesseract.png)
![image](./images/tesseract.png)
</details>
</summary>


# Full Example Usage

Source: [full_example.ts](./examples/full_example.ts)

```typescript
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
```

<summary>
Output of the above code:
<details>

```bash
Word Meaning:  {
  explanation: {
    en: 'The heliosphere is the region of space influenced by the Sun, including the solar wind, magnetic fields, and cosmic rays. It extends from the Sun to the outer edges of the solar system.',
    native: 'হেলিওস্ফিয়ার হল সূর্যের প্রভাবিত মহাকাশের অঞ্চল, যার মধ্যে রয়েছে সৌর বায়ু, চৌম্বক ক্ষেত্র এবং মহাজাগতিক রশ্মি। এটি সূর্য থেকে সৌরজগতের বাইরের প্রান্ত পর্যন্ত বিস্তৃত।'
  },
  examples: [
    {
      en: "The Voyager spacecraft have entered the heliosphere, sending back valuable data about the Sun's influence on the outer reaches of the solar system.",
      native: 'ভয়েজার মহাকাশযানগুলি হেলিওস্ফিয়ারে প্রবেশ করেছে, সৌরজগতের বাইরের প্রান্তে সূর্যের প্রভাব সম্পর্কে মূল্যবান তথ্য পাঠিয়েছে।'
    },
    {
      en: 'The heliosphere acts as a shield, protecting the solar system from harmful cosmic rays and charged particles.',
      native: 'হেলিওস্ফিয়ারটি একটি ঢাল হিসাবে কাজ করে, সৌরজগতকে ক্ষতিকারক মহাজাগতিক রশ্মি এবং চার্জযুক্ত কণা থেকে রক্ষা করে।'
    },
    {
      en: 'The shape of the heliosphere is influenced by the interstellar medium, a region of space outside the solar system.',
      native: 'হেলিওস্ফিয়ারের আকৃতি ইন্টারস্টেলার মিডিয়াম দ্বারা প্রভাবিত হয়, যা সৌরজগতের বাইরের মহাকাশের একটি অঞ্চল।'
    },
    {
      en: "Scientists study the heliosphere to better understand the impact of solar activity on the Earth's magnetic field.",
      native: 'বিজ্ঞানীরা সৌর কার্যকলাপের প্রভাব সম্পর্কে আরও ভালভাবে বোঝার জন্য হেলিওস্ফিয়ার অধ্যয়ন করেন পৃথিবীর চৌম্বক ক্ষেত্রে।'
    },
    {
      en: 'The heliosphere is not a perfect sphere, but rather a complex, dynamic region of space that is constantly changing.',
      native: 'হেলিওস্ফিয়ারটি একটি নিখুঁত গোলক নয়, বরং একটি জটিল, গতিশীল মহাকাশের অঞ্চল যা সর্বদা পরিবর্তিত হচ্ছে।'
    }
  ]
}
Generating image for this senctence: 
 The Voyager spacecraft have entered the heliosphere, sending back valuable data about the Sun's influence on the outer reaches of the solar system.
Image Generation Prompt:  A stylized, glowing representation of the heliosphere, with the Voyager spacecraft approaching the outer edge, surrounded by a swarm of charged particles and solar winds emanating from the Sun. The heliosphere is depicted as a vibrant, iridescent bubble, with the Sun at its center, illuminating the outer reaches of the solar system. The Voyager spacecraft are shown in detail, with their antennae and instruments collecting data as they traverse the heliosphere's boundary.
Image Data:  [
  {
    revised_prompt: 'Create an artwork that represents a stylized, luminous version of the heliosphere. The image should show the Voyager spacecraft nearing the external limit, enwrapped by a cluster of electrified particles and solar winds flowing from the Sun. The heliosphere is visualized as a bright, lustrous orb, with the Sun stationed at its core, casting light on the distant corners of the solar system. The Voyager spacecraft are illustrated in a detailed manner, complete with their antennas and tools gathering information as they cross the boundary of the heliosphere.',
    url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-IhQA8HrlaVmpi9josHXuqSen/user-A2l4hPsKEH8I9NbyBxyJZsog/img-S4L6ua8pQs3EiSL7qZwkkTbM.png?st=2025-03-29T18%3A32%3A32Z&se=2025-03-29T20%3A32%3A32Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-29T15%3A25%3A57Z&ske=2025-03-30T15%3A25%3A57Z&sks=b&skv=2024-08-04&sig=1u/KiclTi36nq%2BmYnlfIu7EZD4RgH8bXyLSqAso9B1g%3D'
  }
]
Downloading Image...

Image saved to tesseract.png
```
</details>

Generated Image:
<details>

Image File: [heliosphere.png](./images/heliosphere.png)
![image](./images/heliosphere.png)
</details>
</summary>


**See the full library documentation in [LIBRARY_DOC.md](./LIBRARY_DOC.md)**