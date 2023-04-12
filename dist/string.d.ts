import { ValidationResponse } from "./types";
/**
 * Validates a string or email
 */
export declare function stringValidation(options: {
    /** The value to be validated */
    value: string;
    /** The minimum allowed length of the string, inclusive */
    minLength?: number;
    /** The maximum allowed length of the string, inclusive */
    maxLength: number;
    /** Whether the value can be empty or not */
    optional?: boolean;
    /** The message to be returned if the value is empty */
    emptyMessage?: string;
    /** The message to be returned if the value is too long */
    tooLongMessage?: string;
    /** The message to be returned if the value is too short */
    tooShortMessage?: string;
    /** Which regex the string should be checked against */
    regexTest?: 'email' | 'username';
    /** Any custom regex that the string should be tested against. It has a higher priority than the standard regex */
    customRegexTest?: RegExp;
    /** The message to be returned if the value does not match the selected regex */
    regexFailMessage?: string;
    /** The final string won't be trimmed from the starting and ending white spaces */
    doNotTrim?: boolean;
}): ValidationResponse<string>;
