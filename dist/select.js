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
