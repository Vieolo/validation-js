export type ValidationResponse<T> = {
    isValid: boolean;
    value: T;
    message: string;
};
