declare type ValidationResponse<T> = {
    isValid: boolean;
    value: T;
    message: string;
};
/**
 * Counts the number of decimal places in a given number
 * @param n The number to be tested
 */
export declare function getDecimalPrecision(n: number): number;
/**
 * Validates a string or email
 */
export declare function stringValidation(options: {
    /** The value to be validated */
    value: string;
    /** The maximum allowed length of the string, inclusive */
    maxLength: number;
    /** Whether the value can be empty or not */
    optional?: boolean;
    /** The message to be returned if the value is empty */
    emptyMessage?: string;
    /** The message to be returned if the value is too long */
    tooLongMessage?: string;
    /** Which regex the string should be checked against */
    regexTest?: 'general' | 'email';
}): ValidationResponse<string>;
/**
 * Takes a string and checks if it is a valid number or not
 */
export declare function numberValidation(options: {
    /** The string to be checked */
    value: string;
    /** The minimum allowed number, inclusive */
    min: number;
    /** The maximum allowed number, inclusive */
    max: number;
    /** Whether the number can be float or not */
    allowFloat: boolean;
    /** The number of allowed decimal places */
    decimalPlaceCount: number;
    /** Whether the value can be empty or not */
    optional?: boolean;
    /** The message to be return in case the value is empty and shouldn't be */
    emptyMessage?: string;
    /** The message to be return in case the value is not a number */
    notNumberMessage?: string;
    /** The message to be return in case the value has be to an integer but isn't */
    onlyIntegerMessage?: string;
    /** The message to be return in case the value is too small */
    tooSmalMessage?: string;
    /** The message to be return in case the value is too large */
    tooLargeMessage?: string;
    /** The message to be return in case the value can be a float but has too many decimal places */
    tooManyDecimalPlacesMessage?: string;
}): ValidationResponse<number>;
/**
 * Validates a date given in string format
 */
export declare function dateValidation(options: {
    /** The value to be checked */
    value: string;
    /** The date format used for the value */
    format: 'dd/mm/yyyy' | 'mm/dd/yyyy' | 'yyyy-mm-dd';
    /** Whether the value can be empty or not */
    optional?: boolean;
    /** The minimum allowed date (Optional) */
    min?: Date;
    /** The maximum allowed date (Optional) */
    max?: Date;
    /** The message to be return in case the value is empty but should not be */
    emptyMessage?: string;
    /** The message to be return in case the value is not a valid date */
    invalidMessage?: string;
}): ValidationResponse<Date>;
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
/**
 * Validates the various aspects of a file (JS instance of File class)
 */
export declare function fileValidation(options: {
    /** The file object */
    file: File;
    /** The maximum allowed size */
    maxSize?: number;
}): ValidationResponse<boolean>;
export {};
