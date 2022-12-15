// Types
import { ValidationResponse } from "./types";

/**
 * Validates the selected option of a HTML select
 */
export function selectValidation(
    options: {
        /** The value to be checked */
        value: string,
        /** Whether the value can be empty or not */
        optional?: boolean,
        /** The list of possible values that are forbidden */
        forbidden?: string[],
        /** The message to be return in case the value is empty but should not be */
        emptyMessage?: string,
        /** The message to be return in case the value is among one of the forbidden values */
        forbiddenMessage?: string
    }): ValidationResponse<string> {

    if (options.value == null || !options.value.trim()) return { isValid: options.optional || false, value: '', message: options.emptyMessage || 'Please select an option!' };

    if ((options.forbidden || [] as string[]).includes(options.value)) return { isValid: false, value: '', message: options.forbiddenMessage || 'The selected option is not allowed' };

    return { isValid: true, value: options.value, message: '' };
}