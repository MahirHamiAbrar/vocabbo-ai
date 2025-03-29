var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BaseAIModel: () => BaseAIModel,
  VocabboAI: () => VocabboAI,
  VocabboImageGenAI: () => VocabboImageGenAI,
  download_image: () => download_image,
  modelConfig: () => model_config_exports,
  save_base64_image: () => save_base64_image,
  types: () => types_exports
});
module.exports = __toCommonJS(index_exports);
var import_config = require("dotenv/config");

// src/types.ts
var types_exports = {};

// src/model_config.ts
var model_config_exports = {};
__export(model_config_exports, {
  GeminiBackendConfig: () => GeminiBackendConfig,
  GroqBackendConfig: () => GroqBackendConfig,
  ImageGenBackendConfig: () => ImageGenBackendConfig,
  OpenAIBackendConfig: () => OpenAIBackendConfig
});
var GroqBackendConfig = {
  baseUrl: "https://api.groq.com/openai/v1",
  modelName: "llama-3.3-70b-versatile",
  apiKey: process.env.GROQ_API_KEY || null
};
var GeminiBackendConfig = {
  baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai/",
  modelName: "gemini-2.0-flash",
  apiKey: process.env.GEMINI_API_KEY || null
};
var OpenAIBackendConfig = {
  baseUrl: "https://api.openai.com/v1",
  modelName: "gpt-4o-mini",
  apiKey: process.env.OPENAI_API_KEY || null
};
var ImageGenBackendConfig = {
  baseUrl: "https://api.openai.com/v1",
  modelName: "dall-e-3",
  apiKey: process.env.OPENAI_API_KEY || null
};

// src/base_model.ts
var import_openai = __toESM(require("openai"), 1);
var import_console = require("console");

// src/prompts.ts
var WORD_EXPLANATION_SYSTEM_PROMPT = `You are a helpful assistant who helps users to learn foreign words.

Your task is to provide two short explanations of the word-
    - One in user's preferred language (Detect from the provided word's language if not explicitely mentioned). 
    - Other in easier English.

Then provide FIVE usage of those words in sentences (again: use two languages).

You must return your response in JSON format. YOU SHOULD NOT GENERATE ANYTHING THING EXTRA BESIDES THE VALID JSON FORMAT RESPONSE. The valid JSON format is:
{
    "explanation": {
        "en": "english meaning goes here",
        "native": "same meaning in user's native language goes here"
    },

    "examples": 
        {
            "en": "en-example-1",
            "native": "same-example-in-native-language-01"
        },
        {
            "en": "en-example-2",
            "native": "same-example-in-native-language-02"
        },
        {
            "en": "en-example-3",
            "native": "same-example-in-native-language-03"
        },
        ...
    ]
}

Here is an example-
User Query: Explain the word: philosophy. Preferred Language: Bangla.
Response:
{
    "explanation": {
        "en": "Philosophy is the study of the fundamental nature of knowledge, reality, and existence. It involves thinking deeply about life, the universe, and everything.",
        "native": "\u09A6\u09B0\u09CD\u09B6\u09A8\u09B6\u09BE\u09B8\u09CD\u09A4\u09CD\u09B0 \u09B9\u09B2 \u099C\u09CD\u099E\u09BE\u09A8, \u09AC\u09BE\u09B8\u09CD\u09A4\u09AC\u09A4\u09BE \u098F\u09AC\u0982 \u0985\u09B8\u09CD\u09A4\u09BF\u09A4\u09CD\u09AC\u09C7\u09B0 \u09AE\u09CC\u09B2\u09BF\u0995 \u09AA\u09CD\u09B0\u0995\u09C3\u09A4\u09BF \u0985\u09A7\u09CD\u09AF\u09AF\u09BC\u09A8\u0964 \u098F\u099F\u09BF \u099C\u09C0\u09AC\u09A8, \u09AE\u09B9\u09BE\u09AC\u09BF\u09B6\u09CD\u09AC \u098F\u09AC\u0982 \u09B8\u09AE\u09B8\u09CD\u09A4 \u0995\u09BF\u099B\u09C1 \u09B8\u09AE\u09CD\u09AA\u09B0\u09CD\u0995\u09C7 \u0997\u09AD\u09C0\u09B0 \u099A\u09BF\u09A8\u09CD\u09A4\u09BE \u0995\u09B0\u09BE\u09B0 \u09AA\u09CD\u09B0\u0995\u09CD\u09B0\u09BF\u09AF\u09BC\u09BE\u0964"
    },
    "examples": [
        {
            "en": "He is studying philosophy to understand the meaning of life.",
            "native": "\u09B8\u09C7 \u09A6\u09B0\u09CD\u09B6\u09A8\u09B6\u09BE\u09B8\u09CD\u09A4\u09CD\u09B0 \u0985\u09A7\u09CD\u09AF\u09AF\u09BC\u09A8 \u0995\u09B0\u099B\u09C7 \u099C\u09C0\u09AC\u09A8\u09B0\u09C7\u09B0 \u0985\u09B0\u09CD\u09A5 \u09AC\u09C1\u099D\u09A4\u09C7\u0964"
        },
        {
            "en": "The philosophy of science helps explain the natural world.",
            "native": "\u09AC\u09BF\u099C\u09CD\u099E\u09BE\u09A8 \u09A6\u09B0\u09CD\u09B6\u09A8 \u09AA\u09CD\u09B0\u09BE\u0995\u09C3\u09A4\u09BF\u0995 \u09AC\u09BF\u09B6\u09CD\u09AC\u09C7\u09B0 \u09AC\u09CD\u09AF\u09BE\u0996\u09CD\u09AF\u09BE \u0995\u09B0\u09A4\u09C7 \u09B8\u09BE\u09B9\u09BE\u09AF\u09CD\u09AF \u0995\u09B0\u09C7\u0964"
        },
        {
            "en": "Many great philosophers have shaped human thinking over the centuries.",
            "native": "\u0985\u09A8\u09C7\u0995 \u09AE\u09B9\u09BE\u09A8 \u09A6\u09BE\u09B0\u09CD\u09B6\u09A8\u09BF\u0995 \u09B6\u09A4\u09BE\u09AC\u09CD\u09A6\u09C0 \u09A7\u09B0\u09C7 \u09AE\u09BE\u09A8\u09C1\u09B7\u09C7\u09B0 \u099A\u09BF\u09A8\u09CD\u09A4\u09BE-\u09AD\u09BE\u09AC\u09A8\u09BE \u0997\u09A0\u09A8 \u0995\u09B0\u09C7\u099B\u09C7\u09A8\u0964"
        },
        {
            "en": "Her philosophy of life focuses on kindness and compassion.",
            "native": "\u09A4\u09BE\u09B0 \u099C\u09C0\u09AC\u09A8 \u09A6\u09B0\u09CD\u09B6\u09A8 \u09A6\u09AF\u09BC\u09BE \u098F\u09AC\u0982 \u09B8\u09B9\u09BE\u09A8\u09C1\u09AD\u09C2\u09A4\u09BF\u09B0 \u0989\u09AA\u09B0 \u0997\u09C1\u09B0\u09C1\u09A4\u09CD\u09AC \u09A6\u09C7\u09AF\u09BC\u0964"
        },
        {
            "en": "He challenged traditional philosophy with his new ideas.",
            "native": "\u09B8\u09C7 \u09A4\u09BE\u09B0 \u09A8\u09A4\u09C1\u09A8 \u09A7\u09BE\u09B0\u09A3\u09BE\u0997\u09C1\u09B2\u09BF\u09B0 \u09AE\u09BE\u09A7\u09CD\u09AF\u09AE\u09C7 \u09AA\u09CD\u09B0\u099A\u09B2\u09BF\u09A4 \u09A6\u09B0\u09CD\u09B6\u09A8\u0995\u09C7 \u099A\u09CD\u09AF\u09BE\u09B2\u09C7\u099E\u09CD\u099C \u0995\u09B0\u09C7\u099B\u09BF\u09B2\u0964"
        }
    ]
}
`;
var IMAGE_GENERATION_SYSTEM_PROMPT = `You are a helpful assistant who generates DALLE prompts based on the given context.

You will be provided with a sentence as a context and a word (contextual to the sentence) that you have to emphasize on in the prompt;
and from that context sentence, you'll have to generate an image generation prompt for DALLE-3.

You must return your response in JSON format. YOU SHOULD NOT GENERATE ANYTHING THING EXTRA BESIDES THE VALID JSON FORMAT RESPONSE. The valid JSON format is:
{
    "prompt": "***dall-e prompt goes here***"
}

Here is an example:
INPUT: Sentence: The astronaut performed a spacewalk to repair the damaged solar panel.

Emphasize Word: Spaceship

OUTPUT:
{
    "prompt": "A futuristic spaceship orbiting Earth with an astronaut performing a spacewalk to repair a damaged solar panel. The spaceship has a sleek, high-tech design with large solar arrays extending from its body. The Earth\u2019s curvature is visible in the background, with stars shining in deep space. The astronaut is tethered to the spaceship, using specialized tools to fix the panel."
}
`;

// src/base_model.ts
var BaseAIModel = class {
  _client;
  _model_name;
  constructor(api_key, model_name, base_url) {
    this._client = new import_openai.default({
      apiKey: api_key,
      baseURL: base_url
    });
    this.set_model_name(model_name);
  }
  async get_model_list() {
    return (await this._client.models.list()).data;
  }
  async search_model(model_name) {
    const model_list = await this.get_model_list();
    var _found = false;
    var _model;
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
    };
  }
  async model_exists(model_name) {
    return (await this.search_model(model_name)).found;
  }
  async set_model_name(model_name) {
    (0, import_console.assert)(
      this.model_exists(model_name),
      `Model: ${model_name} is not a valid name.`
    );
    this._model_name = model_name;
  }
  async _get_chat_completion(sys_prompt, user_prompt) {
    const _completion = await this._client.chat.completions.create({
      model: this._model_name,
      messages: [
        {
          role: "system",
          content: sys_prompt
        },
        {
          role: "user",
          content: user_prompt
        }
      ]
    });
    return JSON.parse(_completion.choices[0].message.content);
  }
  async explain_word(word, lang) {
    return await this._get_chat_completion(
      WORD_EXPLANATION_SYSTEM_PROMPT,
      `Explain the word: ${word}. Preferred Language: ${lang}.`
    );
  }
  async create_image_gen_prompt(word, context) {
    return (await this._get_chat_completion(
      IMAGE_GENERATION_SYSTEM_PROMPT,
      `Sentence: ${context}

Emphasize Word: ${word}.`
    )).prompt;
  }
};

// src/vocabboai.ts
var import_console2 = require("console");
var import_openai2 = __toESM(require("openai"), 1);

// src/utils.ts
var import_axios = __toESM(require("axios"), 1);
var fs = __toESM(require("fs"), 1);
var path = __toESM(require("path"), 1);
var import_uuid = require("uuid");
async function download_image(url, savePath = null) {
  try {
    savePath = get_image_filepath(savePath);
    const response = await import_axios.default.get(url, { responseType: "stream" });
    const writer = fs.createWriteStream(savePath);
    response.data.pipe(writer);
    writer.on("finish", () => {
      console.log(`Image saved to ${savePath}`);
    });
    writer.on("error", (err) => {
      console.error("Error saving the image", err);
    });
  } catch (error) {
    console.error("Error downloading the image:", error);
    return null;
  }
  return savePath;
}
async function save_base64_image(b64_json, savePath = null) {
  try {
    savePath = get_image_filepath(savePath);
    const img_buffer = Buffer.from(b64_json, "base64");
    fs.writeFileSync(savePath, img_buffer);
  } catch (error) {
    console.error(`Error Saving b64_json image: "${b64_json}"`);
    return null;
  }
  return savePath;
}
function create_filename(create_from = "datetime") {
  var fname;
  if (create_from == "uuid") {
    fname = (0, import_uuid.v4)().toString().replaceAll("-", "_");
  } else if (create_from == "datetime") {
    fname = (/* @__PURE__ */ new Date()).toUTCString().replaceAll(" ", "_").replaceAll(",", "_").replaceAll(":", "_");
  } else {
    throw new Error(`"create_from" must be one of: "datetime" or "uuid".`);
  }
  return fname;
}
function validate_path(fp) {
  var dir = path.dirname(fp);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return fp;
}
function get_image_filepath(savePath = null) {
  if (!savePath) {
    const dir = process.env.IMAGE_SAVE_DIR;
    const filename = create_filename() + ".png";
    savePath = path.join(dir, filename);
  } else {
    savePath = validate_path(savePath);
  }
  return savePath;
}
function create_data_savepath(create_from = "uuid") {
  const dirname2 = create_filename(create_from);
  const savepath = validate_path(
    path.join(process.env.DATA_SAVE_DIR, dirname2)
  );
  fs.mkdirSync(savepath, { recursive: true });
  return savepath;
}

// src/vocabboai.ts
var fs2 = __toESM(require("fs"), 1);
var path2 = __toESM(require("path"), 1);
var VocabboAI = class {
  // backend variables
  _backend;
  _supported_backends = [
    "openai",
    "gemini",
    "groq"
  ];
  // model variables
  _model;
  _model_data;
  constructor(params = null) {
    const {
      ai_backend = "groq",
      api_key = null,
      model_name = null
    } = params;
    (0, import_console2.assert)(
      this.is_valid_backend(ai_backend),
      `Provided backend: ${ai_backend} is invalid.`
    );
    switch (ai_backend) {
      case "openai":
        this._model_data = OpenAIBackendConfig;
        break;
      case "gemini":
        this._model_data = GeminiBackendConfig;
        break;
      case "groq":
        this._model_data = GroqBackendConfig;
        break;
    }
    this._model_data.apiKey = api_key || this._model_data.apiKey;
    this._model_data.modelName = model_name || this._model_data.modelName;
    this._model = new BaseAIModel(
      this._model_data.apiKey,
      this._model_data.modelName,
      this._model_data.baseUrl
    );
  }
  get_supported_backends() {
    return this._supported_backends;
  }
  is_valid_backend(backend) {
    this._supported_backends.forEach((backend_name) => {
      if (backend_name == backend) {
        return true;
      }
    });
    return false;
  }
  async get_model_list() {
    return await this._model.get_model_list();
  }
  async search_model(model_name) {
    return await this._model.search_model(model_name);
  }
  async model_exists(model_name) {
    return (await this._model.search_model(model_name)).found;
  }
  async set_model_name(model_name) {
    return await this._model.set_model_name(model_name);
  }
  async explain_word(word, lang) {
    return await this._model.explain_word(word, lang);
  }
  async create_image_gen_prompt(word, context) {
    return await this._model.create_image_gen_prompt(word, context);
  }
};
var VocabboImageGenAI = class {
  _model;
  _default_config = {
    prompt: "",
    model: "dall-e-3",
    n: 1,
    quality: "standard",
    response_format: "b64_json",
    size: "1024x1024",
    style: "vivid",
    user: ""
  };
  _current_config = this._default_config;
  constructor() {
    this._model = new import_openai2.default({
      apiKey: OpenAIBackendConfig.apiKey,
      baseURL: OpenAIBackendConfig.baseUrl
    });
  }
  set_config(config) {
    if (config.prompt) this._current_config.prompt = config.prompt;
    if (config.model) this._current_config.model = config.model;
    if (config.n) this._current_config.n = config.n;
    if (config.quality) this._current_config.quality = config.quality;
    if (config.response_format) this._current_config.response_format = config.response_format;
    if (config.size) this._current_config.size = config.size;
    if (config.style) this._current_config.style = config.style;
    if (config.user) this._current_config.user = config.user;
  }
  /*
      NOTE: The generated url is only valid for a short time (1 hour)
      and the image is not saved in the OpenAI server.
      So, if you want to save the image, you have to download it
      using the url and save it in your local machine.
  */
  async generate_image_url(prompt) {
    if (!prompt || prompt.length == 0) {
      throw new Error("Prompt is empty.");
    }
    this._current_config.response_format = "url";
    this._current_config.prompt = prompt;
    return (await this._model.images.generate(this._current_config)).data;
  }
  async generate_image_base64(config = null, save_image = true) {
    if (!config) {
      config = this._default_config;
    }
    (0, import_console2.assert)(
      !config.response_format || config.response_format == "b64_json",
      "Response Format must be 'b64_json'."
    );
    const _resp = await this._model.images.generate(config);
    const _images = _resp.data;
    var _img_paths = [];
    if (save_image) {
      for (const img of _images) {
        const img_path = await save_base64_image(img.b64_json);
        _img_paths.push(img_path);
      }
    }
    return {
      images: _images,
      paths: _img_paths
    };
  }
  async save_image_data(config, images) {
    const savedir = create_data_savepath();
    const datafilepath = path2.join(savedir, "data.json");
    const jsondata = JSON.stringify({ config, images }, null, 4);
    fs2.writeFileSync(
      datafilepath,
      jsondata
    );
    return datafilepath;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseAIModel,
  VocabboAI,
  VocabboImageGenAI,
  download_image,
  modelConfig,
  save_base64_image,
  types
});
