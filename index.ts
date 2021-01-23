

type ValidationResponse<T> = {
    isValid: boolean,
    value: T,
    message: string
}


/**
 * Counts the number of decimal places in a given number
 * @param n The number to be tested
 */
export function getDecimalPrecision(n: number): number {
    let e = 1, p = 0;
    while (Math.round(n * e) / e !== n) { e *= 10; p++; }
    return p;
}




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
            const emailRegex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm;
            return emailRegex.test(options.value) ? successResponse : { isValid: false, value: '', message: 'Please enter a valid email!' };
        }

    }

}



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



/**
 * Validates a date given in string format
 */
export function dateValidation(
    options: {
        /** The value to be checked */
        value: string,
        /** The date format used for the value */
        format: 'dd/mm/yyyy' | 'mm/dd/yyyy' | 'yyyy-mm-dd',
        /** Whether the value can be empty or not */
        optional?: boolean,
        /** The minimum allowed date (Optional) */
        min?: Date,
        /** The maximum allowed date (Optional) */
        max?: Date,
        /** The message to be return in case the value is empty but should not be */
        emptyMessage?: string,
        /** The message to be return in case the value is not a valid date */
        invalidMessage?: string
    }): ValidationResponse<Date> {

    if (!options.value.trim()) return { isValid: options.optional || false, value: new Date(1970, 0, 1), message: options.emptyMessage || 'Please enter a valid date!' };

    let day: number;
    let month: number;
    let year: number;
    let l: string[];

    if (options.format == 'dd/mm/yyyy') {
        l = options.value.split('/');
        day = parseInt(l[0]);
        month = parseInt(l[1]) - 1;
        year = parseInt(l[2]);
    } else if (options.format == 'mm/dd/yyyy') {
        l = options.value.split('/');
        day = parseInt(l[1]);
        month = parseInt(l[0]) - 1;
        year = parseInt(l[2]);
    } else {
        l = options.value.split('-');
        day = parseInt(l[2]);
        month = parseInt(l[1]) - 1;
        year = parseInt(l[0]);
    }

    let date = new Date(year, month, day);
    if (isNaN(date.getTime()) || isNaN(day) || isNaN(month) || isNaN(year) || !isWithinDuration(date) || !matchesIntended(date, year, month, day)) {
        return { isValid: false, value: new Date(1970, 0, 1), message: options.invalidMessage || "Please enter a valid date!" };
    }

    return { isValid: true, value: date, message: '' };



    function isWithinDuration(targetDate: Date) {
        if (targetDate < (options.max || new Date(2500, 0, 1)) && targetDate > (options.min || new Date(1970, 0, 1))) return true;
        else return false;
    }


    function matchesIntended(targetDate: Date, year: number, month: number, day: number) {
        if (targetDate.getFullYear() == year && targetDate.getMonth() == month && targetDate.getDate() == day) return true;
        else return false;
    }
}




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
