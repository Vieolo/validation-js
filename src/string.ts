// Installed Packages
import { emailRegexStandAlone } from "@vieolo/regex-library";

// Types
import { ValidationResponse } from "./types";

/**
 * Validates a string or email
 */
export function stringValidation(
    options: {
        /** The value to be validated */
        value: string,
        /** The minimum allowed length of the string, inclusive */
        minLength?: number,
        /** The maximum allowed length of the string, inclusive */
        maxLength: number,
        /** Whether the value can be empty or not */
        optional?: boolean,
        /** The message to be returned if the value is empty */
        emptyMessage?: string,
        /** The message to be returned if the value is too long */
        tooLongMessage?: string,
        /** The message to be returned if the value is too short */
        tooShortMessage?: string,
        /** Which regex the string should be checked against */
        regexTest?: 'email' | 'username',
        /** Any custom regex that the string should be tested against. It has a higher priority than the standard regex */
        customRegexTest?: RegExp,
        /** The message to be returned if the value does not match the selected regex */
        regexFailMessage?: string,
    }
): ValidationResponse<string> {    
    // Empty
    if (!options.value.trim()) return { 
        isValid: options.optional || false, 
        value: "", 
        message: options.optional ? "" : options.emptyMessage || 'This value cannot be empty' 
    };
    
    // Too Long
    else if (options.value.length > options.maxLength) return { 
        isValid: false, 
        value: '', 
        message: options.tooLongMessage || `The given value cannot be longer than ${options.maxLength}` 
    };
    
    // Too short
    else if (options.minLength && options.value.length < options.minLength) return { 
        isValid: false, 
        value: '', 
        message: options.tooShortMessage || `The given value cannot be shorter than ${options.minLength}` 
    };

    // The length is right, is now proceeding to the content
    else {
        let successResponse = { isValid: true, value: options.value, message: '' };
        
        // No regex is needed to be checked, success is returend
        if (!options.regexTest && !options.customRegexTest) return successResponse;
        else if (options.customRegexTest) {
            return options.customRegexTest.test(options.value) 
                ? successResponse 
                : { isValid: false, value: '', message: options.regexFailMessage || 'The entered value is not acceptable!' };
        }
        else if (options.regexTest === 'email') {            
            return emailRegexStandAlone.test(options.value) 
                ? successResponse 
                : { isValid: false, value: '', message: options.regexFailMessage || 'Please enter a valid email!' };
        } else { // Username
            const usernameRegex: RegExp = /^[a-zA-Z]([a-z]|[A-Z]|_|-|\.|\+|\d)+$/;
            return usernameRegex.test(options.value) 
                ? successResponse 
                : { isValid: false, value: '', message: options.regexFailMessage || 'Please enter a username!' };
        }

    }

}