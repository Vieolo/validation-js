// Utils
import { getDecimalPrecision } from "./utils";
/**
 * Takes a string and checks if it is a valid number or not
 */
export function numberValidation(options) {
    if (!options.value.trim())
        return { isValid: options.optional || false, value: 0, message: options.emptyMessage || "Please enter a valid number!" };
    let num = parseFloat(options.value);
    let successResponse = { isValid: true, message: "", value: num };
    let numberRegex = /^\-{0,1}[0-9]*\.?[0-9]{0,20}$/;
    function _errorResponse(m) { return { isValid: false, value: 0, message: m }; }
    if (!isNaN(num) && numberRegex.test(options.value)) {
        if (!options.allowFloat && Math.floor(num) != num)
            return _errorResponse(options.onlyIntegerMessage || "Only integers are allowed!");
        else {
            if (Math.floor(num) == num) {
                if (options.min <= num && num <= options.max)
                    return successResponse;
                else if (options.min > num)
                    return _errorResponse(options.tooSmalMessage || `This number cannot be smaller than ${options.min}`);
                else
                    return _errorResponse(options.tooLargeMessage || `This number cannot be larger than ${options.max}`);
            }
            else {
                if (getDecimalPrecision(num) <= options.decimalPlaceCount && options.min <= num && num <= options.max)
                    return successResponse;
                else if (getDecimalPrecision(num) > options.decimalPlaceCount)
                    return _errorResponse(options.tooManyDecimalPlacesMessage || `This number can only have up to ${options.decimalPlaceCount} decimal places!`);
                else if (options.min > num)
                    return _errorResponse(options.tooSmalMessage || `This number cannot be smaller than ${options.min}`);
                else
                    return _errorResponse(options.tooLargeMessage || `This number cannot be larger than ${options.max}`);
            }
        }
    }
    else {
        return _errorResponse(options.notNumberMessage || 'Only numbers are allowed!');
    }
}
