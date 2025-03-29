import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";


/* * Downloads an image from a URL and saves it to a specified path
 * @param url - URL of the image to download
 * @param savePath - path to save the image, if null, a new path will be created
 * @returns - path to the saved image
 * @throws - Error if the image cannot be downloaded or saved
 * */
export async function download_image(
  url: string,
  savePath: string | null = null
): Promise<string | null> {

    try {

        // either create a new savePath or 
        // ensure the provided savePath's parent directory already exists
        savePath = get_image_filepath(savePath);
        
        // Fetch the image from the URL
        const response = await axios.get(url, { responseType: "stream" });

        // Pipe the image data to a file
        const writer = fs.createWriteStream(savePath);
        response.data.pipe(writer);

        // Wait for the write operation to complete
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


/* * Saves base64 images in PNG format
 * @param b64_json - base64 string of the image
 * @param savePath - path to save the image, if null, a new path will be created
 * @returns - path to the saved image
 * @throws - Error if the image cannot be saved
 * */
export async function save_base64_image(
    b64_json: string, 
    savePath: string | null = null
): Promise<string | null> {

    try {
        // either create a new savePath or 
        // ensure the provided savePath's parent directory already exists
        savePath = get_image_filepath(savePath);

        // create buffer from base64 string
        const img_buffer = Buffer.from(b64_json, "base64");

        // save the image
        fs.writeFileSync(savePath, img_buffer);

    } catch (error) {
        console.error(`Error Saving b64_json image: "${b64_json}"`);
        return null;
    }

    return savePath;
}


export function create_filename(create_from: string = "datetime"): string {
    // filename
    var fname: string;

    if (create_from == "uuid") {
        fname = uuidv4()
            .toString()
            .replaceAll('-', '_');
    }
    else if (create_from == "datetime") {
        fname = new Date()
        .toUTCString()
        .replaceAll(" ", "_")
        .replaceAll(",", "_")
        .replaceAll(":", "_");
    }
    else {
        throw new Error(`"create_from" must be one of: "datetime" or "uuid".`);
    }

    return fname;
}


export function validate_path(fp: string): string {

    // Ensure the directory exists
    var dir = path.dirname(fp);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    return fp;
}


export function get_image_filepath(savePath: string | null = null): string {

    if (!savePath) {
        const dir: string = process.env.IMAGE_SAVE_DIR;
        const filename: string = create_filename() + ".png";
        savePath = path.join(dir, filename);
    } else {
        savePath = validate_path(savePath);
    }

    return savePath;
}

export function create_data_savepath(create_from: string = "uuid") {
    // create a unique dirname
    const dirname: string = create_filename(create_from);
    
    const savepath: string = validate_path(
        path.join(process.env.DATA_SAVE_DIR, dirname)
    );
    
    fs.mkdirSync(savepath, { recursive: true });
    
    return savepath;
}
