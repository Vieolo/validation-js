import {
    fileValidation
} from '../src/index'


describe("Validation", () => {
    global.File = class MockFile {
        name: string;
        constructor(parts: (string | Blob | ArrayBuffer | ArrayBufferView)[], filename: string, properties ? : FilePropertyBag) {
          this.name = filename;
        }
      } as any

    test("fileValidation", () => {
            
        expect(fileValidation({file: new File([""], "ssd.pdf")}).isValid).toBe(true)
        expect(fileValidation({file: new File([""], "ssd AZz_()-123456 12.pdf")}).isValid).toBe(true)
        expect(fileValidation({file: new File([""], "+ ssd.pdf")}).isValid).toBe(false)
        expect(fileValidation({file: new File([""], "ss+d.pdf")}).isValid).toBe(false)
        expect(fileValidation({file: new File([""], "ssd +.pdf")}).isValid).toBe(false)
        expect(fileValidation({file: new File([""], "!ssd.pdf")}).isValid).toBe(false)
        expect(fileValidation({file: new File([""], "  !ssd  .pdf")}).isValid).toBe(false)
        expect(fileValidation({file: new File([""], "__!_ssd1A.pdf")}).isValid).toBe(false)
        expect(fileValidation({file: new File([""], "__!_ssd.1A.pdf")}).isValid).toBe(false)

    })

})