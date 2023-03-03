// const event = require('node:events')
//
// const eventEmitter = new event();
//
// eventEmitter.on('click', (data) => {
//     console.log(data);
//     console.log('click click')
// })
//
// eventEmitter.emit('click', {name: 'Nazar'})
// eventEmitter.emit('click', {name: 'Nazar'})
// eventEmitter.emit('click', {name: 'Nazar'})
//
// eventEmitter.once('clickOnce', () => {
//     console.log('click once because i will die')
// })
//
// eventEmitter.emit('clickOnce')
// console.log(eventEmitter.eventNames());


// const fs = require('node:fs')
// const path = require('node:path')
//
// const readStream = fs.createReadStream(path.join('test', 'text.txt'))
// const writeStream = fs.createWriteStream(path.join('test', 'text2.txt'))
// !! // streams: duplex, transform, readStream, writeStream
//
// const handleError = () => {
//     console.log('Error')
//     readStream.destroy()
//     writeStream.end('Error while reading file')
// }

// readStream.on('data', (chunk) => {
//     writeStream.write(chunk)
// })
// readStream
//     .on('error', handleError)
//     .pipe(writeStream)


const path = require("node:path");
const express = require('express')
const fsService = require('./fs.service')

const app = express()
const PORT = 5100

app.use(express.json())
app.use(express.urlencoded({extended: true}))


// app.get('/welcome', (req, res) => {
//     res.send('welcome')
// })

app.post('/users', async (req, res) => {
    const body = req.body
    const users = await fsService.reader()

    users.push(body)
    await fsService.writer(users)

    res.status(201).json(body)
})

app.get('/users', async (req, res) => {
    const users = await fsService.reader()
    res.status(200).send(users)
})

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params
    const user = users[+userId]
    res.json(user)
})


app.put('/users/:userId', (req, res) => {
    const {userId} = req.params
    const updateUser = req.body

    users[+userId] = updateUser

    req.status.json({
        message: 'User updated',
        data: users[+userId]
    })
})

app.delete('/users/:userId', (req, res) => {
    const {userId} = req.params

    users.splice(+userId, 1)

    res.json({
        message: 'User deleted'
    })
})

app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`)
})







