/**
 *
 * @param a {number}
 * @param b {number}
 * @param n {number}
 * @param J {number[]}
 * @returns {number}
 */

export default function trapezoidIntegral(n, J){
    let sum = 0;
    let h = (b - a) / n;
    for (let i = 0; i < n; i++) {
        sum += (J[i][0] + J[i][1]);
    }
    sum *= 0.5 * h;
    return sum;
}