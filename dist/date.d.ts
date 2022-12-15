import { ValidationResponse } from "./types";
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
