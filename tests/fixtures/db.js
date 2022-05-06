const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'User One',
    email: 'user1@example.com',
    password: '123456789',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
        }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'User Two',
    email: 'user2@example.com',
    password: '123456789',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
        }]
}

const userThreeId = new mongoose.Types.ObjectId()
const userThree = {
    _id: userThreeId,
    name: 'User Three',
    email: 'user3@example.com',
    password: '123456789',
    tokens: [{
        token: jwt.sign({ _id: userThreeId }, process.env.JWT_SECRET)
        }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "This is task one",
    completed: true,
    owner: userOne._id
}
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "This is task two",
    completed: false,
    owner: userOne._id
}
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "This is task three",
    completed: false,
    owner: userTwo._id
}

const setUpDatabase = async() => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new User(userThree).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    userThreeId,
    userThree,
    setUpDatabase
}