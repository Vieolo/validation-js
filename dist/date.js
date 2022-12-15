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
