import OpenAI from "openai";
import { assert } from "console";

import {
    ModelSearchResult,
    WordExplanation
} from "./types";

import {
    WORD_EXPLANATION_SYSTEM_PROMPT,
    IMAGE_GENERATION_SYSTEM_PROMPT,
} from "./prompts";


export class BaseAIModel {

    _client: OpenAI;
    _model_name: string;

    constructor(
        api_key: string,
        model_name: string,
        base_url: string
    ) {

        // new OpenAI regular client
        this._client = new OpenAI({
            apiKey: api_key,
            baseURL: base_url
        });

        // set the model name
        this.set_model_name(model_name);

    }

    async get_model_list(): Promise<OpenAI.Models.Model[]> {
        return (await this._client.models.list()).data;
    }

    async search_model(model_name: string): Promise<ModelSearchResult> {
        const model_list = await this.get_model_list();

        var _found: boolean = false;
        var _model: OpenAI.Models.Model;

        for (const model of model_list) {
            if (model.id == model_name) {
                _model = model;
                _found = true;
                break;
            }
        }

        return {
            found: _found,
            modelInfo: _model
        }
    }

    async model_exists(model_name: string): Promise<boolean> {
        return (await this.search_model(model_name)).found;
    }

    async set_model_name(model_name: string): Promise<void> {
        assert(
            this.model_exists(model_name),
            `Model: ${model_name} is not a valid name.`
        );
        this._model_name = model_name;
    }

    async _get_chat_completion(
        sys_prompt: string,
        user_prompt: string
    ): Promise<any> {
        const _completion = await this._client.chat.completions.create({
            model: this._model_name,
            messages: [
             {
                 role: "system",
                 content: sys_prompt
             },
             {
                 role: "user",
                 content: user_prompt,
             }
            ]
        });

        return JSON.parse(_completion.choices[0].message.content);
    }

    async explain_word(word: string, lang: string): Promise<WordExplanation> {
        return await this._get_chat_completion(
            WORD_EXPLANATION_SYSTEM_PROMPT,
            `Explain the word: ${word}. Preferred Language: ${lang}.`
        );
    }

    async create_image_gen_prompt(word: string, context: string): Promise<string> {
        return (await this._get_chat_completion(
            IMAGE_GENERATION_SYSTEM_PROMPT,
            `Sentence: ${context}\n\nEmphasize Word: ${word}.`
        )).prompt;
    }
};
