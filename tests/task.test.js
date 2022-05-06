const request = require('supertest')
const app = require('../src/app')
const { userOneId, userOne, userTwoId, userTwo, userThreeId, userThree, setUpDatabase } = require('./fixtures/db')
const Task = require('../src/models/task')

beforeEach(setUpDatabase)

test('Should creat task for authorized user', async () => {
    const response = await request(app).post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: "from tasks test"
    }).expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})

test('Should get all tasks for a user', async () => {
    const response = await request(app).get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    expect(response.body.length).toBe(2)
})

test('Should not delete other users tasks', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})