# VocabboAI Library Documentation

## Overview

The `VocabboAI` library provides tools for interacting with AI models to perform tasks such as word explanation, model management, and image generation. It supports multiple backends, including OpenAI, Gemini, and Groq, and offers a modular design for extensibility.

---

## Classes

### `VocabboAI`

This class provides core functionalities for managing AI models and performing text-based tasks.

#### Constructor

```typescript
constructor(params: {
    ai_backend?: string;
    api_key?: string | null;
    model_name?: string | null;
} | null = null)
```

- **Parameters**:
  - `ai_backend` (optional): The backend to use (`openai`, `gemini`, or `groq`). Defaults to `groq`.
  - `api_key` (optional): API key for the backend.
  - `model_name` (optional): Name of the model to use.

#### Methods

- **`get_supported_backends(): string[]`**  
  Returns a list of supported backends.

- **`is_valid_backend(backend: string): boolean`**  
  Checks if the provided backend is valid.

- **`get_model_list(): Promise<OpenAI.Models.Model[]>`**  
  Retrieves a list of available models.

- **`search_model(model_name: string): Promise<ModelSearchResult>`**  
  Searches for a model by name.

- **`model_exists(model_name: string): Promise<boolean>`**  
  Checks if a model exists.

- **`set_model_name(model_name: string): Promise<void>`**  
  Sets the active model by name.

- **`explain_word(word: string, lang: string): Promise<WordExplanation>`**  
  Provides an explanation for a given word in the specified language.

- **`create_image_gen_prompt(word: string, context: string): Promise<string>`**  
  Creates a prompt for image generation based on a word and context.

---

### `VocabboImageGenAI`

This class provides functionalities for generating images using the OpenAI backend.

#### Constructor

```typescript
constructor()
```

- Initializes the image generation model using OpenAI's configuration.

#### Methods

- **`set_config(config: {...}): void`**  
  Updates the image generation configuration.  
  - **Parameters**:
    - `prompt`: The text prompt for image generation.
    - `model`: The model to use (e.g., `dall-e-3`).
    - `n`: Number of images to generate.
    - `quality`: Image quality (`standard` or `hd`).
    - `response_format`: Format of the response (`url` or `b64_json`).
    - `size`: Image size (e.g., `1024x1024`).
    - `style`: Image style (`vivid` or `natural`).
    - `user`: User identifier.

- **`generate_image_url(prompt: string): Promise<OpenAI.Images.Image[]>`**  
  Generates images and returns their URLs.  
  - **Parameters**:
    - `prompt`: The text prompt for image generation.

- **`generate_image_base64(config: ImageGenConfig | null = null, save_image: boolean = true): Promise<ImageData>`**  
  Generates images in base64 format and optionally saves them locally.  
  - **Parameters**:
    - `config`: Configuration for image generation.
    - `save_image`: Whether to save the images locally.

- **`save_image_data(config: ImageGenConfig, images: ImageData): Promise<string>`**  
  Saves image generation data to a JSON file.  
  - **Parameters**:
    - `config`: The configuration used for image generation.
    - `images`: The generated image data.

---

## Notes

- The `VocabboAI` class is designed for text-based tasks such as **Word Explanation Generation**, **DALL-E Prompt Generation**, while the `VocabboImageGenAI` class focuses on image generation.
- The OpenAI backend is required for image generation functionalities.
- Ensure API keys and configurations are properly set before using the library.

---

## Documenation for the types
### WordExplanation Type

The `WordExplanation` type represents the explanation of a word in dual languages along with examples.

#### Properties

- **`explanation`** (`DualLanguageMeaning`):  
    The explanation of the word in English and its native language.

- **`examples`** (`DualLanguageMeaning[]`):  
    A list of example sentences or phrases in English and their native language.

#### DualLanguageMeaning Type

The `DualLanguageMeaning` type represents a meaning or text in two languages.

##### Properties

- **`english`** (`string`):  
    The text or meaning in English.

- **`native`** (`string`):  
    The text or meaning in the native language.



## Example Usage

### Text-Based Tasks

```typescript
const vocabbo = new VocabboAI({ ai_backend: 'openai', api_key: 'your-api-key' });

(async () => {
    const meaning = await vocabbo.explain_word('example', 'bangla');
    console.log("Word Meaning: ", meaning.explanation);
    console.log("\n\n Examples", meaning.examples);
})();
```

### Image Generation

```typescript
const imageGen = new VocabboImageGenAI();

(async () => {
    const images = await imageGen.generate_image_url('A futuristic cityscape');
    console.log(images);
})();
```