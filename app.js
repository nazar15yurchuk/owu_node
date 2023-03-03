const fs = require('fs/promises')
const path = require('path')
//
// // fs.mkdir('./users', (err)=>{
// //     if (err) throw new Error(err.message)
// // })
// //
// // fs.mkdir(path.join('users', '1'), (err) => {
// //     if(err) throw new Error(err.message)
// // })
// // fs.mkdir(path.join('users', '2'), (err) => {
// //     if(err) throw new Error(err.message)
// // })
// // fs.mkdir(path.join('users', '3'), (err) => {
// //     if(err) throw new Error(err.message)
// // })
//
// fs.writeFile(path.join('users', '4.txt'), 'Im 4', (err) => {
//     if(err) throw new Error(err.message)
// })
// fs.writeFile(path.join('users', '5.txt'), 'Im 5', (err) => {
//     if(err) throw new Error(err.message)
// })
// fs.writeFile(path.join('users', '6.txt'), 'Im 6', (err) => {
//     if(err) throw new Error(err.message)
// })
//
// fs.appendFile(path.join('users', '6.txt'), 'Hello', (err) => {
//     if(err)throw new Error(err.message)
// })
//
// fs.readdir(path.join('users'), {withFileTypes: true}, (err, data) => {
//     if(err) throw new Error(err.message)
//     data.forEach(file => {
//         console.log('isDirectory: ' + file.isDirectory())
//     })
// })

// -----------------------------

// fs.mkdir('boys', (err) => {
//     if (err) throw new Error(err.message)
// })
//
// fs.mkdir(path.join('girls'), (err) => {
//     if (err) throw new Error(err.message)
// })
const foo = async () => {
    const files = await fs.readdir(path.join(__dirname, 'boys'))

    for (const file of files) {
        const filePath = path.join(__dirname, 'boys', file)
        const data = await fs.readFile(path.join(__dirname, 'boys', file))
        const buffer = data.toString()
        const user = JSON.parse(buffer)
        if(user.gender === 'female'){
            await fs.rename(filePath, path.join(__dirname, 'girls', file))
        }
    }
}
foo()


const foo1 = async () => {
    const files = await fs.readdir(path.join(__dirname, 'girls'))

    for (const file of files) {
        const filePath = path.join(__dirname, 'girls', file)
        const data = await fs.readFile(path.join(__dirname, 'girls', file))
        const buffer = data.toString()
        const user = JSON.parse(buffer)
        if(user.gender === 'male'){
            await fs.rename(filePath, path.join(__dirname, 'boys', file))
        }
    }
}

foo1()