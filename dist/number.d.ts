import { ValidationResponse } from "./types";
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
