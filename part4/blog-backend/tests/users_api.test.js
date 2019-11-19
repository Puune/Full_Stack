const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);
const User = require('../models/users');
const helper = require('../tests/test_helper');

/*
beforeEach(async () => {
  await User.deleteMany({});

  const users = [
    {
      username: 'Panu',
      passwordHash: 'yksi'
    },
    {
      username: 'Janne',
      passwordHash: 'kaksi'
    },
    {
      username: 'Pete',
      passwordHash: 'yksi'
    }
  ]

  users.forEach(async (usr) => {
    const user = new User(usr);
    await user.save();
  })

})
*/

describe('When posting and getting users to/from database', () => {

  const reset = async () => {
    await User.deleteMany({});
    return User.find({});
  }

  const newUser = {
    username: 'Jallu',
    password: 'kolme'
  }

  test('Users are posted', async () => {
    console.log(await reset());

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(result.body.username).toBe('Jallu');
  })

  test('reading all users succeeds', async () => {
    const users = await api.get('/api/users');        
    expect(await users.body).toEqual(await helper.usersInDb());
  })

  test('dublicates are not accepted', async () => {
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('too short psw:s are not accepted', async () => {
    await reset();
    newUser.password = 'a'
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})


afterAll(() => {
  mongoose.connection.close();
})