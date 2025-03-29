import OpenAI from "openai";
import { ImageGenerateParams } from "openai/resources";
export {
    type ImageGenerateParams as ImageGenConfig
}

export type PromptMessage = {
    role: string;
    content: string;
}

export type ModelSearchResult = {
    /**
        Status of the search result
    */
    found: boolean;
    /**
        The model information, can be `null` if not found
    */
    modelInfo: OpenAI.Models.Model;
}

export type DualLanguageMeaning = {
    en: string;
    native: string;
}

export type WordExplanation = {
    explanation: DualLanguageMeaning;
    examples: DualLanguageMeaning[];
}

export type ImageData = {
    images: OpenAI.Images.Image[];
    paths: string[];
}
