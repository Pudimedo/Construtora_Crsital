let a = new Date("1995-12-17")
let b = new Date().toISOString().split('T').slice(0,-1).toString()

let c = b.split('-')

console.log(c)

async function compareBirthdayWithCurrentDate() {
    let aniversariantes = await fetch('aniversariantes.json')
    console.log(aniversariantes)
}

compareBirthdayWithCurrentDate()