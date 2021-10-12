/**
 * Counts the number of decimal places in a given number
 * @param n The number to be tested
 */
export function getDecimalPrecision(n) {
    let e = 1, p = 0;
    while (Math.round(n * e) / e !== n) {
        e *= 10;
        p++;
    }
    return p;
}
/**
 * Validates a string or email
 */
export function stringValidation(options) {
    if (!options.value.trim())
        return { isValid: options.optional || false, value: "", message: options.emptyMessage || 'This value cannot be empty' };
    else if (options.value.length > options.maxLength)
        return { isValid: false, value: '', message: options.tooLongMessage || `The given value cannot be longer than ${options.maxLength}` };
    else {
        let successResponse = { isValid: true, value: options.value, message: '' };
        if (!options.regexTest || options.regexTest == 'general')
            return successResponse;
        else {
            const emailRegex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm;
            return emailRegex.test(options.value) ? successResponse : { isValid: false, value: '', message: 'Please enter a valid email!' };
        }
    }
}
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
/**
 * Validates a date given in string format
 */
export function dateValidation(options) {
    if (!options.value.trim())
        return { isValid: options.optional || false, value: new Date(1970, 0, 1), message: options.emptyMessage || 'Please enter a valid date!' };
    let day;
    let month;
    let year;
    let l;
    if (options.format == 'dd/mm/yyyy') {
        l = options.value.split('/');
        day = parseInt(l[0]);
        month = parseInt(l[1]) - 1;
        year = parseInt(l[2]);
    }
    else if (options.format == 'mm/dd/yyyy') {
        l = options.value.split('/');
        day = parseInt(l[1]);
        month = parseInt(l[0]) - 1;
        year = parseInt(l[2]);
    }
    else {
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
    function isWithinDuration(targetDate) {
        if (targetDate < (options.max || new Date(2500, 0, 1)) && targetDate > (options.min || new Date(1970, 0, 1)))
            return true;
        else
            return false;
    }
    function matchesIntended(targetDate, year, month, day) {
        if (targetDate.getFullYear() == year && targetDate.getMonth() == month && targetDate.getDate() == day)
            return true;
        else
            return false;
    }
}
/**
 * Validates the selected option of a HTML select
 */
export function selectValidation(options) {
    if (options.value == null || !options.value.trim())
        return { isValid: options.optional || false, value: '', message: options.emptyMessage || 'Please select an option!' };
    if ((options.forbidden || []).includes(options.value))
        return { isValid: false, value: '', message: options.forbiddenMessage || 'The selected option is not allowed' };
    return { isValid: true, value: options.value, message: '' };
}
export function fileNameValidation(fileName) {
    let fileNameSplited = fileName.split('.');
    // If the length of the splitted name is more than 2, it indicates that there is more than one `.` in the file name
    if (fileNameSplited.length != 2)
        return false;
    const fileNameRegex = /^[a-zA-z 0-9\-\_\(\)]+$/gm;
    if (!fileNameRegex.test(fileNameSplited[0]))
        return false;
    return true;
}
/**
 * Validates the various aspects of a file (JS instance of File class)
 */
export function fileValidation(options) {
    let isFileNameValid = fileNameValidation(options.file.name);
    if (!isFileNameValid)
        return { isValid: false, message: "The name of the file is not valid", value: false };
    if (options.maxSize && options.maxSize > options.file.size)
        return { isValid: false, message: "The file is too large", value: false };
    return { isValid: true, message: "", value: true };
}
