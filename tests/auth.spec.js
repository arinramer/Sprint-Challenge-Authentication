const db = require('../database/dbConfig');

const request = require('supertest');

const Users = require('../auth/auth-model');

const server = require('../api/server');

beforeEach(async () => {
    await db('users').truncate();
})

describe('users model', () => {
    describe('add()', () => {
        it('should add a new user to the database', async () => {
            await Users.add({ username: 'testuser1', password: 'abc123' });
            await Users.add({ username: 'testuser2', password: 'abc123' });
            const users = await db('users');
            expect(users).toHaveLength(2);
        })
        it('should return status 201', async () => {
            await request(server).post('/api/auth/register').send({ username: 'testuser', password: 'abc123' }).expect(201)
        })
    })
    describe('findBy()', () => {
        it('should find a user in the database', async () => {
            await Users.add({ username: 'testuser', password: 'abc123' });
            await Users.findBy({ username: 'testuser' });
        })
        it('should return status 200', async () => {
            await request(server).post('/api/auth/register').send({ username: 'testuser', password: 'abc123' }).expect(201)
            await request(server).post('/api/auth/login').send({ username: 'testuser', password: 'abc123' }).expect(200)
        })
    })
})