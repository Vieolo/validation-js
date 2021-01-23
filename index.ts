

type ValidationResponse<T> = {
    isValid: boolean,
    value: T,
    message: string
}


/**
     * Counts the number of decimal places in a given number
     * @param number The number to be tested
     */
export function getDecimalPrecision(number: number): number {
    //if (!isFinite(number)) return 9999999999999;
    let e = 1, p = 0;
    while (Math.round(number * e) / e !== number) { e *= 10; p++; }
    return p;
}




/**
 * Validates a string
 * @param value The value to be validated
 * @param maxLength The maximum allowed length of the string, inclusive
 */
export function stringValidation(
    value: string,
    maxLength: number,
    extraOptions?: {
        /** Whether the value can be empty or not */
        optional?: boolean,
        /** The message to be returned if the value is empty */
        emptyMessage?: string,
        /** The message to be returned if the value is too long */
        tooLongMessage?: string,
        /** Which regex the string should be checked against */
        regexTest?: 'general' | 'email'
    }): ValidationResponse<string> {

    let options = {
        optional: extraOptions?.optional || false,
        emptyMessage: extraOptions?.emptyMessage || 'This value cannot be empty',
        tooLongMessage: extraOptions?.tooLongMessage || `The given value cannot be longer than ${maxLength}`,
        regexTest: extraOptions?.regexTest || 'general'
    }
    if (!value.trim()) return { isValid: options.optional, value: "", message: options.emptyMessage };
    else if (value.length > maxLength) return { isValid: false, value: '', message: options.tooLongMessage };
    else {
        let successResponse = { isValid: true, value: value, message: '' };
        if (options.regexTest == 'general') return successResponse;
        else {
            const emailRegex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm;
            return emailRegex.test(value) ? successResponse : { isValid: false, value: '', message: 'Please enter a valid email!' };
        }

    }

}



/**
 * Takes a string and checks if it is a valid number or not
 * @param value The string to be checked
 * @param min The minimum allowed number, inclusive
 * @param max The maximum allowed number, inclusive
 * @param allowFloat Whether the number can be float or not
 * @param decimalPlaceCount The number of allowed decimal places	 
 */
export function numberValidation(
    value: string,
    min: number,
    max: number,
    allowFloat: boolean,
    decimalPlaceCount: number,
    extraOptions?: {
        optional?: boolean,
        emptyMessage?: string,
        notNumberMessage?: string,
        onlyIntegerMessage?: string,
        tooSmalMessage?: string,
        tooLargeMessage?: string,
        tooManyDecimalPlacesMessage?: string
    }): ValidationResponse<number> {

    let options = {
        optional: extraOptions?.optional || false,
        emptyMessage: extraOptions?.emptyMessage || "Please enter a valid number!",
        notNumberMessage: extraOptions?.notNumberMessage || 'Only numbers are allowed!',
        onlyIntegerMessage: extraOptions?.onlyIntegerMessage || 'Only integers are allowed!',
        tooSmalMessage: extraOptions?.tooSmalMessage || `This number cannot be smaller than ${min}`,
        tooLargeMessage: extraOptions?.tooLargeMessage || `This number cannot be larger than ${max}`,
        tooManyDecimalPlacesMessage: extraOptions?.tooManyDecimalPlacesMessage || `This number can only have up to ${decimalPlaceCount} decimal places!`
    }

    if (!value.trim()) return { isValid: options.optional, value: 0, message: options.emptyMessage };

    let number = parseFloat(value);
    let successResponse = { isValid: true, message: "", value: number };
    let numberRegex = /^\-{0,1}[0-9]*\.?[0-9]{0,20}$/;

    function _errorResponse(m: string) { return { isValid: false, value: 0, message: m } }

    if (!isNaN(number) && numberRegex.test(value)) {

        if (!allowFloat && Math.floor(number) != number) return _errorResponse(options.onlyIntegerMessage);

        else {
            if (Math.floor(number) == number) {
                if (min <= number && number <= max) return successResponse;
                else if (min > number) return _errorResponse(options.tooSmalMessage);
                else return _errorResponse(options.tooLargeMessage);
            } else {
                if (getDecimalPrecision(number) <= decimalPlaceCount && min <= number && number <= max) return successResponse;
                else if (getDecimalPrecision(number) > decimalPlaceCount) return _errorResponse(options.tooManyDecimalPlacesMessage);
                else if (min > number) return _errorResponse(options.tooSmalMessage);
                else return _errorResponse(options.tooLargeMessage);
            }
        }
    } else {
        return _errorResponse(options.notNumberMessage);
    }
}



export function dateValidation(
    value: string,
    format: 'dd/mm/yyyy' | 'mm/dd/yyyy' | 'yyyy-mm-dd',
    extraOptions?: {
        optional?: boolean,
        min?: Date,
        max?: Date,
        emptyMessage?: string,
        invalidMessage?: string
    }): ValidationResponse<Date> {

    let options = {
        optional: extraOptions?.optional || false,
        min: extraOptions?.min || new Date(1970, 0, 1),
        max: extraOptions?.max || new Date(2100, 0, 1),
        emptyMessage: extraOptions?.emptyMessage || 'Please enter a valid date!',
        invalidMessage: extraOptions?.invalidMessage || "Please enter a valid date!"
    };

    if (!value.trim()) return { isValid: options.optional, value: new Date(1970, 0, 1), message: options.emptyMessage };

    let day: number;
    let month: number;
    let year: number;
    let l: string[];

    if (format == 'dd/mm/yyyy') {
        l = value.split('/');
        day = parseInt(l[0]);
        month = parseInt(l[1]) - 1;
        year = parseInt(l[2]);
    } else if (format == 'mm/dd/yyyy') {
        l = value.split('/');
        day = parseInt(l[1]);
        month = parseInt(l[0]) - 1;
        year = parseInt(l[2]);
    } else {
        l = value.split('-');
        day = parseInt(l[2]);
        month = parseInt(l[1]) - 1;
        year = parseInt(l[0]);
    }

    let date = new Date(year, month, day);
    if (isNaN(date.getTime()) || isNaN(day) || isNaN(month) || isNaN(year) || !isWithinDuration(date) || !matchesIntended(date, year, month, day)) {
        return { isValid: false, value: new Date(1970, 0, 1), message: options.invalidMessage };
    }

    return { isValid: true, value: date, message: '' };



    function isWithinDuration(targetDate: Date) {
        if (targetDate < options.max && targetDate > options.min) return true;
        else return false;
    }


    function matchesIntended(targetDate: Date, year: number, month: number, day: number) {
        if (targetDate.getFullYear() == year && targetDate.getMonth() == month && targetDate.getDate() == day) return true;
        else return false;
    }
}





export function selectValidation(
    value: string,
    extraOptions?: {
        optional?: boolean,
        forbidden?: string[],
        emptyMessage?: string,
        forbiddenMessage?: string
    }): ValidationResponse<string> {

    let options = {
        optional: extraOptions?.optional || false,
        forbidden: extraOptions?.forbidden || [],
        emptyMessage: extraOptions?.emptyMessage || 'Please select an option!',
        forbiddenMessage: extraOptions?.forbiddenMessage || 'The selected option is not allowed',
    }

    if (value == null || value == undefined || !value.trim()) return { isValid: options.optional, value: '', message: options.emptyMessage };

    if (options.forbidden.includes(value)) return { isValid: false, value: '', message: options.forbiddenMessage };

    return { isValid: true, value: value, message: '' };
}