export type DefaultModelBackendConfig = {
    baseUrl: string;
    modelName: string;
    apiKey: string;
}

export const GroqBackendConfig: DefaultModelBackendConfig = {
    baseUrl: "https://api.groq.com/openai/v1",
    modelName: "llama-3.3-70b-versatile",
    apiKey: process.env.GROQ_API_KEY || null,
}

export const GeminiBackendConfig: DefaultModelBackendConfig = {
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai/",
    modelName: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY || null,
}

export const OpenAIBackendConfig: DefaultModelBackendConfig = {
    baseUrl: "https://api.openai.com/v1",
    modelName: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY || null,
}

export const ImageGenBackendConfig: DefaultModelBackendConfig = {
    baseUrl: "https://api.openai.com/v1",
    modelName: "dall-e-3",
    apiKey: process.env.OPENAI_API_KEY || null,
}
