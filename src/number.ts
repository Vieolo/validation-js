// Utils
import { getDecimalPrecision } from "./utils";

// Types
import { ValidationResponse } from "./types";

/**
 * Takes a string and checks if it is a valid number or not
 */
export function numberValidation(
    options: {
        /** The string to be checked */
        value: string,
        /** The minimum allowed number, inclusive */
        min: number,
        /** The maximum allowed number, inclusive */
        max: number,
        /** Whether the number can be float or not */
        allowFloat: boolean,
        /** The number of allowed decimal places */
        decimalPlaceCount: number,
        /** Whether the value can be empty or not */
        optional?: boolean,
        /** The message to be return in case the value is empty and shouldn't be */
        emptyMessage?: string,
        /** The message to be return in case the value is not a number */
        notNumberMessage?: string,
        /** The message to be return in case the value has be to an integer but isn't */
        onlyIntegerMessage?: string,
        /** The message to be return in case the value is too small */
        tooSmalMessage?: string,
        /** The message to be return in case the value is too large */
        tooLargeMessage?: string,
        /** The message to be return in case the value can be a float but has too many decimal places */
        tooManyDecimalPlacesMessage?: string
    }): ValidationResponse<number> {

    if (!options.value.trim()) return { isValid: options.optional || false, value: 0, message: options.emptyMessage || "Please enter a valid number!" };

    let num = parseFloat(options.value);
    let successResponse = { isValid: true, message: "", value: num };
    let numberRegex = /^\-{0,1}[0-9]*\.?[0-9]{0,20}$/;

    function _errorResponse(m: string) { return { isValid: false, value: 0, message: m } }

    if (!isNaN(num) && numberRegex.test(options.value)) {

        if (!options.allowFloat && Math.floor(num) != num) return _errorResponse(options.onlyIntegerMessage || "Only integers are allowed!");

        else {
            if (Math.floor(num) == num) {
                if (options.min <= num && num <= options.max) return successResponse;
                else if (options.min > num) return _errorResponse(options.tooSmalMessage || `This number cannot be smaller than ${options.min}`);
                else return _errorResponse(options.tooLargeMessage || `This number cannot be larger than ${options.max}`);
            } else {
                if (getDecimalPrecision(num) <= options.decimalPlaceCount && options.min <= num && num <= options.max) return successResponse;
                else if (getDecimalPrecision(num) > options.decimalPlaceCount) return _errorResponse(options.tooManyDecimalPlacesMessage || `This number can only have up to ${options.decimalPlaceCount} decimal places!`);
                else if (options.min > num) return _errorResponse(options.tooSmalMessage || `This number cannot be smaller than ${options.min}`);
                else return _errorResponse(options.tooLargeMessage || `This number cannot be larger than ${options.max}`);
            }
        }
    } else {
        return _errorResponse(options.notNumberMessage || 'Only numbers are allowed!');
    }
}