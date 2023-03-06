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
    const {name, age, gender} = req.body
    const users = await fsService.reader()

    if(!name || name.length < 2){
        res.status(400).json('Wrong name')
    }
    if(!age || !Number.isInteger(age) || Number.isNaN(age)){
        res.status(400).json('Wrong age')
    }
    if(!gender || (gender !== 'male' && gender !== 'female')){
        res.status(400).json('Wrong gender')
    }

    const newUser = {id: users[users.length - 1].id + 1 || 1, name, age, gender}
    users.push(newUser)
    await fsService.writer(users)

    res.status(201).json(newUser)
})

app.get('/users', async (req, res) => {
    const users = await fsService.reader()
    res.status(200).send(users)
})

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params
    const users = await fsService.reader()
    const user = users.find((user) => user.id === +userId)

    if(!user){
        res.status(400).json(`User with id: ${userId} not found`)
    }

    res.status(200).json(user)
})


app.put('/users/:userId', async (req, res) => {
    const {userId} = req.params
    const {name, age, gender} = req.body

    if(name && name.length < 2){
        res.status(400).json('Wrong name')
    }
    if(age && !Number.isInteger(age) || Number.isNaN(age)){
        res.status(400).json('Wrong age')
    }
    if(gender && (gender !== 'male' && gender !== 'female')){
        res.status(400).json('Wrong gender')
    }

    const users = await fsService.reader()
    const index = users.findIndex((user) => user.id === +userId)

    users[index] = {...users[index], ...req.body}

    await fsService.writer(users)

    res.status(201).json(users[index])
})

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params

    const users = await fsService.reader()
    const index = users.findIndex((user) => user.id === +userId)
    if(index === -1){
        res.status(422).json(`User with id: ${userId} not found`)
    }

    users.splice(index, 1)

    await fsService.writer(users)
    res.sendStatus(204)
})

app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`)
})







