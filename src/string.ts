// Types
import { ValidationResponse } from "./types";

/**
 * Validates a string or email
 */
export function stringValidation(
    options: {
        /** The value to be validated */
        value: string,
        /** The maximum allowed length of the string, inclusive */
        maxLength: number,
        /** Whether the value can be empty or not */
        optional?: boolean,
        /** The message to be returned if the value is empty */
        emptyMessage?: string,
        /** The message to be returned if the value is too long */
        tooLongMessage?: string,
        /** Which regex the string should be checked against */
        regexTest?: 'general' | 'email'
    }
): ValidationResponse<string> {

    if (!options.value.trim()) return { isValid: options.optional || false, value: "", message: options.emptyMessage || 'This value cannot be empty' };
    else if (options.value.length > options.maxLength) return { isValid: false, value: '', message: options.tooLongMessage || `The given value cannot be longer than ${options.maxLength}` };
    else {
        let successResponse = { isValid: true, value: options.value, message: '' };
        if (!options.regexTest || options.regexTest == 'general') return successResponse;
        else {
            const emailRegex: RegExp = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm;
            return emailRegex.test(options.value) ? successResponse : { isValid: false, value: '', message: 'Please enter a valid email!' };
        }

    }

}