const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setUpDatabase } = require('./fixtures/db')


beforeEach(setUpDatabase)

test('This should signup a new user', async() => {
    const response = await request(app).post('/users').send({
        name: 'Ahmed',
        email: 'testuser1@example.com',
        password: 'a123456789'
    }).expect(201)
})

test('This should login an existing user', async () => {
    const respond = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(respond.body.token).toBe(user.tokens[1].token)
})

test("Shouldn't login non existing user", async() => {
    await request(app).post('/users/login').send({
        email: 'testuser1@example.com',
        password: 'a12343789'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    })

    test('Should not get profile for user', async () => {
        await request(app)
        .get('/users/me')
        .send()
        .expect(401)
        })

        test('Should delete account for user', async () => {
            const respond = await request(app)
            .delete('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)
            const user = await User.findById(userOneId)
            expect(user).toBeNull()
            })

            test('Should not delete account for user', async () => {
                await request(app)
                .delete('/users/me')
                .send()
                .expect(401)
                })
                
test('Should upload avatar', async () => {
    await request(app).post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/102.jpg')
    .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app).patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: "Ahmed"
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toBe("Ahmed")
})

test('Should not update invalid user fields', async () => {
    await request(app).patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location: "Mo"
    }).expect(400)
})