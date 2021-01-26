import app from '../index'
import request from 'supertest'
import dbConnection from '../database'
import { UserAttributes } from '../interfaces/user'
import UserModel from '../models/user'
import { CollectionAttributes } from '../interfaces/collection'
import CollectionModel from '../models/collection'


const user: UserAttributes = {
  firstName: 'John',
  lastName: 'Cena',
  email: 'abc@example.com',
  auth0Id: '12345',
}

// we are creating a fresh db in docker container
// we have set postgres to increment id by one
const userId = 1

const firstCollectionId = 1
const secondCollectionId = 2

const collection: CollectionAttributes = {
  name: 'My collection',
  userId: userId as number,
}

const secondCollection: CollectionAttributes = {
  name: 'Second collection',
  userId: userId as number
}

describe('Collections', async () => {
  beforeAll(async (done) => {
    await dbConnection.authenticate()
    console.log('connected')
    await UserModel.create(user)
    await CollectionModel.create(collection)
    done()
  })

  it('should get all collections', async (done) => {
    const response = await request(app).get(`/collection/list/${userId}`)
    expect(response.status).toEqual(200)
    expect(response.body.length).toEqual(1)
    expect(response.body[0].id).toEqual(firstCollectionId)
    done()
  })

  it('should should create second collection', async (done) => {
    const response = await request(app).post(`/collection/create`).send(secondCollection)
    expect(response.status).toEqual(200)
    const checkSuccessResponse = await request(app).get(`/collection/list/${userId}`)
    expect(checkSuccessResponse.body.length).toEqual(2)
    expect(checkSuccessResponse.body[1].id).toEqual(secondCollectionId)
    done()
  })

  it('should should update second collection name', async (done) => {
    const name = 'Renamed'
    const response = await request(app).put(`/collection/update`).send({
      ...secondCollection,
      id: secondCollectionId,
      name
    })
    expect(response.status).toEqual(200)
    const checkSuccessResponse = await request(app).get(`/collection/list/${userId}`)
    expect(checkSuccessResponse.body[1].name).toEqual(name)
    done()
  })

  it('should should delete second collection', async (done) => {
    const response = await request(app).delete(`/collection/delete/${secondCollectionId}`)
    expect(response.status).toEqual(200)
    const checkSuccess = await request(app).get(`/collection/list/${userId}`)
    expect(checkSuccess.body.length).toEqual(1)
    done()
  })

  afterAll(async done => {
    await UserModel.destroy({
      where: {
        id: userId
      }
    })
    await CollectionModel.destroy({
      where: {
        id: firstCollectionId
      }
    })
    await dbConnection.close();
    done();
  });
})
