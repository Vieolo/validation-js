import {
    stringValidation
} from '../src/index'


describe("String Validation", () => {

    it("validates the length of the string correctly", () => {

        expect(stringValidation({
            maxLength: 10,
            minLength: 2,
            value: "",
            optional: true
        }).isValid).toBe(true)

        expect(stringValidation({
            maxLength: 10,
            minLength: 2,
            value: "",
            optional: false
        }).isValid).toBe(false)

        expect(stringValidation({
            maxLength: 10,
            minLength: 2,
            value: "S",
            optional: false
        }).isValid).toBe(false)

        expect(stringValidation({
            maxLength: 10,
            minLength: 2,
            value: "Su",
        }).isValid).toBe(true)

        expect(stringValidation({
            maxLength: 10,
            minLength: 2,
            value: "Sun",
        }).isValid).toBe(true)

        expect(stringValidation({
            maxLength: 10,
            minLength: 2,
            value: "1234567890",
        }).isValid).toBe(true)

        expect(stringValidation({
            maxLength: 10,
            minLength: 2,
            value: "Sunlight Exposure",
        }).isValid).toBe(false)

    })

    it("validates an email correctly", () => {
        expect(stringValidation({
            maxLength: 100,
            value: "example",
            regexTest: 'email'
        }).isValid).toBe(false)
        
        expect(stringValidation({
            maxLength: 100,
            value: "example@",
            regexTest: 'email'
        }).isValid).toBe(false)
        
        expect(stringValidation({
            maxLength: 100,
            value: "example@example",
            regexTest: 'email'
        }).isValid).toBe(false)
        
        expect(stringValidation({
            maxLength: 100,
            value: "@example",
            regexTest: 'email'
        }).isValid).toBe(false)
        
        expect(stringValidation({
            maxLength: 100,
            value: "example.com",
            regexTest: 'email'
        }).isValid).toBe(false)
        
        expect(stringValidation({
            maxLength: 100,
            value: "example@example.com",
            regexTest: 'email'
        }).isValid).toBe(true)
        
        expect(stringValidation({
            maxLength: 100,
            value: "example.example-_.12@example.io",
            regexTest: 'email'
        }).isValid).toBe(true)
        
        expect(stringValidation({
            maxLength: 100,
            value: "example.example-_.12@example.com.tr",
            regexTest: 'email'
        }).isValid).toBe(true)

        expect(stringValidation({
            maxLength: 100,
            value: "example.example-_.12@example.co.in",
            regexTest: 'email'
        }).isValid).toBe(true)
        
        expect(stringValidation({
            maxLength: 100,
            value: "example.example-_.12@example.dev",
            regexTest: 'email'
        }).isValid).toBe(true)

        expect(stringValidation({
            maxLength: 100,
            value: "example.example-_.12@example.tv",
            regexTest: 'email'
        }).isValid).toBe(true)
        
        expect(stringValidation({
            maxLength: 100,
            value: "example.example-_.12@example.nl",
            regexTest: 'email'
        }).isValid).toBe(true)
        
        expect(stringValidation({
            maxLength: 100,
            value: "INFO@ExamplE.io",
            regexTest: 'email'
        }).isValid).toBe(true)
        
        expect(stringValidation({
            maxLength: 100,
            value: "InfO12_.1@ExamplE12.co.uk",
            regexTest: 'email'
        }).isValid).toBe(true)
        
        expect(stringValidation({
            maxLength: 100,
            value: "info@Example.io",
            regexTest: 'email'
        }).isValid).toBe(true)
    })

})