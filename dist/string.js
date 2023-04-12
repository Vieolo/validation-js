// Installed Packages
import { emailRegexStandAlone } from "@vieolo/regex-library";
/**
 * Validates a string or email
 */
export function stringValidation(options) {
    // Empty
    if (!options.value.trim())
        return {
            isValid: options.optional || false,
            value: "",
            message: options.optional ? "" : options.emptyMessage || 'This value cannot be empty'
        };
    // Too Long
    else if (options.value.length > options.maxLength)
        return {
            isValid: false,
            value: '',
            message: options.tooLongMessage || `The given value cannot be longer than ${options.maxLength}`
        };
    // Too short
    else if (options.minLength && options.value.length < options.minLength)
        return {
            isValid: false,
            value: '',
            message: options.tooShortMessage || `The given value cannot be shorter than ${options.minLength}`
        };
    // The length is right, is now proceeding to the content
    else {
        let successResponse = { isValid: true, value: options.doNotTrim ? options.value : options.value.trim(), message: '' };
        // No regex is needed to be checked, success is returend
        if (!options.regexTest && !options.customRegexTest)
            return successResponse;
        else if (options.customRegexTest) {
            return options.customRegexTest.test(options.value)
                ? successResponse
                : { isValid: false, value: '', message: options.regexFailMessage || 'The entered value is not acceptable!' };
        }
        else if (options.regexTest === 'email') {
            return emailRegexStandAlone.test(options.value)
                ? successResponse
                : { isValid: false, value: '', message: options.regexFailMessage || 'Please enter a valid email!' };
        }
        else { // Username
            const usernameRegex = /^[a-zA-Z]([a-z]|[A-Z]|_|-|\.|\+|\d)+$/;
            return usernameRegex.test(options.value)
                ? successResponse
                : { isValid: false, value: '', message: options.regexFailMessage || 'Please enter a username!' };
        }
    }
}
