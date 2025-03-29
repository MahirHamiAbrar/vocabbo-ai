import OpenAI from "openai";
import { assert } from "console";
import { 
    save_base64_image, 
    create_data_savepath 
} from "./utils";

import {
    ModelSearchResult,
    WordExplanation,
    ImageGenConfig,
    ImageData
} from "./types";

import {
    WORD_EXPLANATION_SYSTEM_PROMPT,
    IMAGE_GENERATION_SYSTEM_PROMPT,
} from "./prompts";

import * as fs from "fs";
import * as path from "path";


export class BaseAIModel {

    _client: OpenAI;
    _model_name: string;

    default_image_gen_config: ImageGenConfig = {
        prompt: "",
        model: "dall-e-3",
        n: 1,
        quality: 'standard',
        response_format: 'b64_json',
        size: '1024x1024',
        style: 'vivid',
        user: ''
    };

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

    async generate_image(
        config: ImageGenConfig | null = null,
        save_image: boolean = true,
    ): Promise<ImageData> {

        if (!config) {
            config = this.default_image_gen_config;
        }

        assert(
            (!config.response_format || config.response_format == 'b64_json'), 
            "Response Format must be 'b64_json'."
        );

        const _resp = await this._client.images.generate(config);
        const _images = _resp.data;
        var _img_paths: string[] = [];
        // console.log(_images);

        if (save_image) {
            for (const img of _images) {
                const img_path: string = await save_base64_image(img.b64_json);
                _img_paths.push(img_path);
            }
        }

        return {
            images: _images,
            paths: _img_paths
        };
    }

    async save_image_data(
        config: ImageGenConfig,
        images: ImageData
    ): Promise<string> {

        // create a new data save directory (with unique name)
        const savedir: string = create_data_savepath();
        const datafilepath: string = path.join(savedir, 'data.json');
        const jsondata: string = JSON.stringify({config, images}, null, 4);

        // save the data
        fs.writeFileSync(
            datafilepath,
            jsondata
        );

        return datafilepath;
    }
};

