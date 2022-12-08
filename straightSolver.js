/**
 *
 * @description Решение диф. уравнения (2), (3) методом Эйлера. Используется разностная схема для первой производной
 * @param u {number[][]}
 * @param tau {number}
 * @returns {number[][]}
 */

export default function straightSolver(u, tau){
    const x = []
    x.push([0, 0])                                      // начальные условия
    for(let i = 1; i < u.length; i++) x.push([          // t = i * tau
            x[i - 1][0] + tau * (Math.cos(i * tau) * x[i - 1][0] + (i * tau) * x[i - 1][1] + u[i][0] * (1 - Math.exp(-(i * tau)))),
            x[i - 1][1] + tau * (Math.sin(i * tau) * x[i - 1][1] + x[i - 1][0] / (i * tau + 1) + u[i][1] * (1 + Math.sin(2 * i * tau)))
        ])


    return x
}