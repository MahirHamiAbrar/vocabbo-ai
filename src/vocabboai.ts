import { assert } from "console";
import * as modelConfig from "./model_config";
import {
    ModelSearchResult,
    WordExplanation,
    ImageData,
    ImageGenConfig
} from "./types";

import OpenAI from "openai";
import { BaseAIModel } from "./base_model";


export class VocabboAI {

    // backend variables
    _backend: string;
    _supported_backends: string[] = [
        'openai',
        'gemini',
        'groq'
    ];

    // model variables
    _model: BaseAIModel;
    _model_data: modelConfig.DefaultModelBackendConfig;

    constructor(params: {
        ai_backend?: string;
        api_key?: string | null;
        model_name?: string | null;
    } | null = null) {
        
        const {
            ai_backend = "groq",
            api_key = null,
            model_name = null,
        } = params;

        // ensure the backend parameter is valid
        assert(
            this.is_valid_backend(ai_backend),
            `Provided backend: ${ai_backend} is invalid.`
        );

        // set text backend model data
        switch (ai_backend) {
            case 'openai':
                this._model_data = modelConfig.OpenAIBackendConfig;
                break;
            
            case 'gemini':
                this._model_data = modelConfig.GeminiBackendConfig;
                break;
            
            case 'groq':
                this._model_data = modelConfig.GroqBackendConfig;
                break;
        }

        // text model config
        this._model_data.apiKey = api_key || this._model_data.apiKey;
        this._model_data.modelName = model_name || this._model_data.modelName;

        // set text model
        this._model = new BaseAIModel(
            this._model_data.apiKey,
            this._model_data.modelName,
            this._model_data.baseUrl
        );

    }

    get_supported_backends(): string[] {
        return this._supported_backends;
    }

    is_valid_backend(backend: string): boolean {
        this._supported_backends.forEach((backend_name) => {
            if (backend_name == backend) {
                return true;
            }
        });
        return false;
    }

    async get_model_list(): Promise<OpenAI.Models.Model[]> {
        return (await this._model.get_model_list());
    }
    
    async search_model(model_name: string): Promise<ModelSearchResult> {
        return (await this._model.search_model(model_name));
    }

    async model_exists(model_name: string): Promise<boolean> {
        return (await this._model.search_model(model_name)).found;
    }

    async set_model_name(model_name: string): Promise<void> {
        return (await this._model.set_model_name(model_name));
    }

    async explain_word(word: string, lang: string): Promise<WordExplanation> {
        return (await this._model.explain_word(word, lang));
    }

    async create_image_gen_prompt(word: string, context: string): Promise<string> {
        return (await this._model.create_image_gen_prompt(word, context));
    }
};



/* ********************************************************** */
/* IMAGE GENERATION METHODS; ONLY POSSIBLE BY OPENAI BACKEND */
/* ********************************************************* */
class VocabboImageGenAI {

    _model: OpenAI;
    _default_config: OpenAI.Images.ImageGenerateParams = {
        prompt: "",
        model: "dall-e-3",
        n: 1,
        quality: 'standard',
        response_format: 'b64_json',
        size: '1024x1024',
        style: 'vivid',
        user: ''
    };

    _current_config: OpenAI.Images.ImageGenerateParams = this._default_config;

    constructor() {

        this._model = new OpenAI({
            apiKey: modelConfig.OpenAIBackendConfig.apiKey,
            baseURL: modelConfig.OpenAIBackendConfig.baseUrl
        });

    }

    set_config(config: {
        prompt?: string;
        model?: (string & {}) | OpenAI.ImageModel | null;
        n?: number | null;
        quality?: 'standard' | 'hd';
        response_format?: 'url' | 'b64_json' | null;
        size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792' | null;
        style?: 'vivid' | 'natural' | null;
        user?: string;
    }) {

        if (config.prompt) this._current_config.prompt = config.prompt;
        if (config.model) this._current_config.model = config.model;
        if (config.n) this._current_config.n = config.n;
        if (config.quality) this._current_config.quality = config.quality;
        if (config.response_format) this._current_config.response_format = config.response_format;
        if (config.size) this._current_config.size = config.size;
        if (config.style) this._current_config.style = config.style;
        if (config.user) this._current_config.user = config.user;
    }

    async generate_image_url(
        prompt: string,
    ): Promise<OpenAI.Images.Image[]> {
        
        // check if the prompt is empty
        if (!prompt || prompt.length == 0) {
            throw new Error("Prompt is empty.");
        }

        this._current_config.response_format = 'url';
        this._current_config.prompt = prompt;
        
        return (await this._model.images.generate(this._current_config)).data;
    }

    async generate_image_base64(
        prompt: string,
    ): Promise<OpenAI.Images.Image[]> {
        
        // check if the prompt is empty
        if (!prompt || prompt.length == 0) {
            throw new Error("Prompt is empty.");
        }

        this._current_config.response_format = 'b64_json';
        this._current_config.prompt = prompt;
        
        return (await this._model.images.generate(this._current_config)).data;
    }
    
};

/* ********************************************************** */
/* *********** END OF IMAGE GENERATION METHODS ************** */
/* ********************************************************** */