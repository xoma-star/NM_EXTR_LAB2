/**
 *
 * @param x {number[]}
 * @param steps {number}
 * @param y {number[]}
 * @param tau {number}
 * @description Решение сопряженной задачи
 */
export default function reverseSolver(x, y, steps, tau){
    let psi = new Array(steps)
    psi[steps - 1] = [2 * (x[0] - y[0]), 2 * (x[1] - y[1])]

    for(let i = steps - 2; i >= 0; i--){
        const t = i * tau
        psi[i] = [
            psi[i + 1][0] - tau * (Math.cos(t) * psi[i + 1][0] + psi[i + 1][1] / (t + 1)),
            psi[i + 1][1] - tau * (Math.sin(t) * psi[i + 1][1] + t * psi[i + 1][0])
        ]
    }

    return psi
}