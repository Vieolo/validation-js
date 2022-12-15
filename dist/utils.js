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
