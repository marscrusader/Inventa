import app from '../index'
import request from 'supertest'
import dbConnection from '../database'
import { UserAttributes } from '../interfaces/user'
import UserModel from '../models/user'
import { CollectionAttributes } from '../interfaces/collection'
import CollectionModel from '../models/collection'
import { InventoryAttributes } from '../interfaces/inventory'
import InventoryModel from '../models/inventory'


// we are creating a fresh db in docker container
// we have set postgres to increment id by one starting from 1
const userId = 1
const user: UserAttributes = {
  firstName: 'John',
  lastName: 'Cena',
  email: 'abc@example.com',
  auth0Id: '12345',
}

const collectionId = 1
const collection: CollectionAttributes = {
  name: 'My collection',
  userId: userId as number,
}

const inventoryId = 1
const inventory: InventoryAttributes = {
  name: 'My inventory',
  quantity: 1,
  collectionId
}

const secondInventoryId = 2
const secondInventory: InventoryAttributes = {
  name: 'My second inventory',
  quantity: 2,
  collectionId
}

describe('Inventory', async () => {
  beforeAll(async (done) => {
    // connect to db and set up mock data
    await dbConnection.authenticate()
    console.log('connected')
    await UserModel.create(user)
    await CollectionModel.create(collection)
    await InventoryModel.create(inventory)
    done()
  })

  it('should get all inventories', async (done) => {
    const response = await request(app).get(`/inventory/list/${collectionId}`)
    expect(response.status).toEqual(200)
    expect(response.body.length).toEqual(1)
    expect(response.body[0].id).toEqual(inventoryId)
    done()
  })

  it('should create second inventory', async (done) => {
    const response = await request(app).post(`/inventory/create`).send(secondInventory)
    expect(response.status).toEqual(200)
    // check success by calling all inventories, should have 2 by now
    const checkSuccessResponse = await request(app).get(`/inventory/list/${collectionId}`)
    expect(checkSuccessResponse.body.length).toEqual(2)
    expect(checkSuccessResponse.body[1].id).toEqual(secondInventoryId)
    done()
  })

  it('should find second inventory', async (done) => {
    const response = await request(app).get(`/inventory/find/${secondInventoryId}`)
    expect(response.status).toEqual(200)
    expect(response.body.id).toEqual(secondInventoryId)
    expect(response.body.quantity).toEqual(secondInventory.quantity)
    done()
  })

  it('should update second inventory', async (done) => {
    const name = 'New name'
    const response = await request(app).put(`/inventory/update`).send({
      ...secondInventory,
      name,
      id: secondInventoryId
    })
    expect(response.status).toEqual(200)
    // probably unnecessary but check anyways
    const checkSuccessResponse = await request(app).get(`/inventory/find/${secondInventoryId}`)
    expect(checkSuccessResponse.body.name).toEqual(name)
    done()
  })

  it('should delete second inventory', async (done) => {
    const response = await request(app).delete(`/inventory/delete/${secondInventoryId}`)
    expect(response.status).toEqual(200)
    // should left 1 by now
    const checkSuccessResponse = await request(app).get(`/inventory/list/${collectionId}`)
    expect(checkSuccessResponse.body.length).toEqual(1)
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
        id: collectionId
      }
    })
    await InventoryModel.destroy({
      where: {
        id: inventoryId
      }
    })
    await dbConnection.close();
    done();
  });
})
