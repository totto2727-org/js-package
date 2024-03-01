import { sleep } from "./src/index.mts"

const sleep1 = sleep(10000)
console.log("sleep1")

const sleep2 = sleep(10000)
console.log("sleep2")

await sleep(3000).promise
console.log("sleep3")

sleep2.forceResolve()
sleep1.forceResolve()

await sleep1.promise
await sleep2.promise
