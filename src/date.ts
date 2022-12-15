// Types
import { ValidationResponse } from "./types";

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