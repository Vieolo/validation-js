import { ValidationResponse } from "./types";
export declare function fileNameValidation(fileName: string): boolean;
/**
 * Validates the various aspects of a file (JS instance of File class)
 */
export declare function fileValidation(options: {
    /** The file object */
    file: File;
    /** The maximum allowed size */
    maxSize?: number;
}): ValidationResponse<boolean>;
