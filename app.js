const fs = require('fs')
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

fs.readdir((path.join('boys')), (err, files) => {
    files.forEach(file => {
        fs.readFile(path.join(file), (err, data) => {
            console.log(err);
            const x = JSON.parse(data)
            if(x.gender === 'female'){
                fs.rename(path.join('boys', 'girls'), (err) => {
                    console.log(err);
                })
            }
        })
    })
})

