// Types
import { ValidationResponse } from "./types";

export function fileNameValidation(fileName: string): boolean {
    let fileNameSplited: string[] = fileName.split('.');    

    // If the length of the splitted name is more than 2, it indicates that there is more than one `.` in the file name
    if (fileNameSplited.length != 2) return false;

    const fileNameRegex: RegExp = /^[a-zA-z 0-9\-\_\(\)]+$/gm;

    if (!fileNameRegex.test(fileNameSplited[0])) return false;
    return true;
}


/**
 * Validates the various aspects of a file (JS instance of File class)
 */
export function fileValidation(
    options: {
        /** The file object */
        file: File,
        /** The maximum allowed size */
        maxSize?: number,
    }): ValidationResponse<boolean> {

    let isFileNameValid = fileNameValidation(options.file.name);

    if (!isFileNameValid) return { isValid: false, message: "The name of the file is not valid", value: false };    

    if (options.maxSize && options.maxSize > options.file.size) return { isValid: false, message: "The file is too large", value: false };

    return { isValid: true, message: "", value: true }

}