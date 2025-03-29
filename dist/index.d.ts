import OpenAI from 'openai';
import { ImageGenerateParams } from 'openai/resources';

type PromptMessage = {
    role: string;
    content: string;
};
type ModelSearchResult = {
    /**
        Status of the search result
    */
    found: boolean;
    /**
        The model information, can be `null` if not found
    */
    modelInfo: OpenAI.Models.Model;
};
type DualLanguageMeaning = {
    en: string;
    native: string;
};
type WordExplanation = {
    explanation: DualLanguageMeaning;
    examples: DualLanguageMeaning[];
};
type ImageData = {
    images: OpenAI.Images.Image[];
    paths: string[];
};

type types_DualLanguageMeaning = DualLanguageMeaning;
type types_ImageData = ImageData;
type types_ModelSearchResult = ModelSearchResult;
type types_PromptMessage = PromptMessage;
type types_WordExplanation = WordExplanation;
declare namespace types {
  export { type types_DualLanguageMeaning as DualLanguageMeaning, type types_ImageData as ImageData, ImageGenerateParams as ImageGenConfig, type types_ModelSearchResult as ModelSearchResult, type types_PromptMessage as PromptMessage, type types_WordExplanation as WordExplanation };
}

type DefaultModelBackendConfig = {
    baseUrl: string;
    modelName: string;
    apiKey: string;
};
declare const GroqBackendConfig: DefaultModelBackendConfig;
declare const GeminiBackendConfig: DefaultModelBackendConfig;
declare const OpenAIBackendConfig: DefaultModelBackendConfig;
declare const ImageGenBackendConfig: DefaultModelBackendConfig;

type model_config_DefaultModelBackendConfig = DefaultModelBackendConfig;
declare const model_config_GeminiBackendConfig: typeof GeminiBackendConfig;
declare const model_config_GroqBackendConfig: typeof GroqBackendConfig;
declare const model_config_ImageGenBackendConfig: typeof ImageGenBackendConfig;
declare const model_config_OpenAIBackendConfig: typeof OpenAIBackendConfig;
declare namespace model_config {
  export { type model_config_DefaultModelBackendConfig as DefaultModelBackendConfig, model_config_GeminiBackendConfig as GeminiBackendConfig, model_config_GroqBackendConfig as GroqBackendConfig, model_config_ImageGenBackendConfig as ImageGenBackendConfig, model_config_OpenAIBackendConfig as OpenAIBackendConfig };
}

declare class BaseAIModel {
    _client: OpenAI;
    _model_name: string;
    constructor(api_key: string, model_name: string, base_url: string);
    get_model_list(): Promise<OpenAI.Models.Model[]>;
    search_model(model_name: string): Promise<ModelSearchResult>;
    model_exists(model_name: string): Promise<boolean>;
    set_model_name(model_name: string): Promise<void>;
    _get_chat_completion(sys_prompt: string, user_prompt: string): Promise<any>;
    explain_word(word: string, lang: string): Promise<WordExplanation>;
    create_image_gen_prompt(word: string, context: string): Promise<string>;
}

declare class VocabboAI {
    _backend: string;
    _supported_backends: string[];
    _model: BaseAIModel;
    _model_data: DefaultModelBackendConfig;
    constructor(params?: {
        ai_backend?: string;
        api_key?: string | null;
        model_name?: string | null;
    } | null);
    get_supported_backends(): string[];
    is_valid_backend(backend: string): boolean;
    get_model_list(): Promise<OpenAI.Models.Model[]>;
    search_model(model_name: string): Promise<ModelSearchResult>;
    model_exists(model_name: string): Promise<boolean>;
    set_model_name(model_name: string): Promise<void>;
    explain_word(word: string, lang: string): Promise<WordExplanation>;
    create_image_gen_prompt(word: string, context: string): Promise<string>;
}
declare class VocabboImageGenAI {
    _model: OpenAI;
    _default_config: OpenAI.Images.ImageGenerateParams;
    _current_config: OpenAI.Images.ImageGenerateParams;
    constructor();
    set_config(config: {
        prompt?: string;
        model?: (string & {}) | OpenAI.ImageModel | null;
        n?: number | null;
        quality?: 'standard' | 'hd';
        response_format?: 'url' | 'b64_json' | null;
        size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792' | null;
        style?: 'vivid' | 'natural' | null;
        user?: string;
    }): void;
    generate_image_url(prompt: string): Promise<OpenAI.Images.Image[]>;
    generate_image_base64(config?: ImageGenerateParams | null, save_image?: boolean): Promise<ImageData>;
    save_image_data(config: ImageGenerateParams, images: ImageData): Promise<string>;
}

declare function download_image(url: string, savePath?: string | null): Promise<string | null>;
declare function save_base64_image(b64_json: string, savePath?: string | null): Promise<string | null>;

export { BaseAIModel, VocabboAI, VocabboImageGenAI, download_image, model_config as modelConfig, save_base64_image, types };
