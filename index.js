import fs from 'fs'
import straightSolver from "./straightSolver.js";
import reverseSolver from "./reverseSolver.js";
import trapezoidIntegral from "./trapezoidIntegral.js";

const steps = 101
const tau = 1 / (steps - 1)
const y1 = 1
const y2 = 2
const eps = 1e-3

let u = []
for(let i = 0; i < steps; i++) u.push([
    10 * i * tau,           // t = tau * i
    20 * i * tau
])

while (true){
    const x = straightSolver(u, tau)
    let norm = Math.sqrt((x[x.length - 1][0] - y1) ** 2 + (x[x.length - 1][1] - y2) ** 2)
    if(norm < eps) {
        console.log(`Точка x: (${x[x.length - 1][0]}, ${x[x.length - 1][1]}). Норма ${norm}`)
        /* https://chart-studio.plotly.com/create/#/ */
        fs.writeFile('./export/x.csv', x.map((x, i) => `${tau * i},${x[0]},${x[1]}`).join("\n"), 'utf8', e => {if(e) console.log(e)})
        fs.writeFile('./export/u.csv', u.map((x, i) => `${tau * i},${x[0]},${x[1]}`).join("\n"), 'utf8', e => {if(e) console.log(e)})
        break
    }
    const psi = reverseSolver(x[x.length - 1], [y1, y2], steps, tau)

    const JDiff = []    // J'
    const vJ = []       // управление
    for(let i = 0; i < steps; i++){
        const t = i * tau
        JDiff.push([                        // J'[u] = B*psi
            psi[i][0] * (1 - Math.exp(-t)),
            psi[i][1] * (1 + Math.sin(2 * t))
        ])
        vJ.push([
            u[i][0] - JDiff[i][0],
            u[i][1] - JDiff[i][1]
        ])
    }
    const xJ = straightSolver(vJ, tau)
    let integral = JDiff[steps - 1][0] ** 2 + JDiff[steps - 1][1] ** 2 + JDiff[0][0] ** 2 + JDiff[0][1] ** 2
    for (let i = 1; i < steps - 1; i++) {
        if (i % 2 === 1) {
            integral += 4 * (JDiff[i][0] ** 2 + JDiff[i][1] ** 2)
        } else {
            integral += 2 * JDiff[i][0] ** 2 + JDiff[i][1] ** 2
        }
    }
    integral *= tau / 3
    norm = (xJ[steps - 1][0] - x[steps - 1][0]) ** 2 + (xJ[steps - 1][1] - x[steps - 1][1]) ** 2
    const alpha = integral / norm / 2

    for(let i = 0; i < steps; i++){
        u[i][0] -= alpha * JDiff[i][0]
        u[i][1] -= alpha * JDiff[i][1]
    }
}