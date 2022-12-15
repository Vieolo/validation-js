import { ValidationResponse } from "./types";
/**
 * Validates the selected option of a HTML select
 */
export declare function selectValidation(options: {
    /** The value to be checked */
    value: string;
    /** Whether the value can be empty or not */
    optional?: boolean;
    /** The list of possible values that are forbidden */
    forbidden?: string[];
    /** The message to be return in case the value is empty but should not be */
    emptyMessage?: string;
    /** The message to be return in case the value is among one of the forbidden values */
    forbiddenMessage?: string;
}): ValidationResponse<string>;
