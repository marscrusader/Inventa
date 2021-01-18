import { NextFunction, Request, Response } from "express";
import { CreateInventoryRequest, UpdateInventoryRequest } from "../interfaces/inventory";
import logger from "../logger";
import InventoryModel from "../models/inventory";
import { validateForm } from "../utils/form";
import { BaseController } from "./base";

export default class InventoryController extends BaseController {
  // START - list inventory
  public async list(req: Request, res: Response, next: NextFunction) {
    const collectionId = req.params.collectionId
    console.log(collectionId + ' hello ')
    logger.info(`[LIST_COLLECTION] List collection request received, collection id=${collectionId}`)

    // 1) Validate
    if (!collectionId) {
      logger.error('[LIST_COLLECTION] Collection id is undefined')
      return this.clientError(res)
    }

    // 2) Get list of inventories
    try {
      const inventories = await InventoryModel.findAll({
        where: {
          collectionId
        },
        attributes: ['name', 'description', 'category', 'serialNumber', 'status', 'cost', 'salePrice', 's3Id', 's3ThumbnailId']
      })
      logger.info(`[LIST_COLLECITON] Successfully retrive list of inventories, total of ${inventories.length} inventories`)
      return this.ok(res, inventories.map(inventory => {
        const { id, name, description, category, s3ThumbnailId, serialNumber, status, cost, salePrice, s3Id } = inventory
        return {
          id,
          name,
          description,
          category,
          s3ThumbnailId,
          serialNumber,
          status,
          cost,
          salePrice,
          s3Id
        }
      }))
    } catch (listError) {
      logger.error('[LIST_COLLECTION] Failed to get list of inventories', listError)
      return this.internalServerError(res)
    }
  }
  // END - list inventory

  // START - find inventory
  public async find(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    logger.info('[FIND_INVENTORY] Receive request to find inventory with id=', id)
    if (!id) {
      logger.error('[FIND_INVENTORY] Id is invalid')
      return this.clientError(res)
    }

    try {
      const inventory = await InventoryModel.findOne({
        where: {
          id
        },
        attributes: ['id', 'name', 'description', 'category', 'serialNumber', 'status', 'cost', 'salePrice', 's3Id', 's3ThumbnailId']
      })
      logger.info('[FIND_INVENTORY] Successfully retrieved inventory with id=', inventory?.id)
      if (!inventory) {
        logger.warn('[FIND_INVENTORY] Inventory is null', inventory)
        return this.internalServerError(res)
      }
      const { name, description, category, s3ThumbnailId, serialNumber, status, cost, salePrice, s3Id } = inventory
      return this.ok(res, {
        id: inventory?.id,
        name,
        description,
        category,
        s3ThumbnailId,
        serialNumber,
        status,
        cost,
        salePrice,
        s3Id
      })
    } catch (findError) {
      if (findError.code === 404) {
        logger.error('[FIND_INVENTORY] Inventory does not exist, id=', id)
        return this.notFound(res)
      }
      logger.error('[FIND_INVENTORY] Failed to find inventory with id=', id)
      return this.internalServerError(res)
    }
  }
  // END - find inventory

  // START - create inventory
  public async create(req: Request, res: Response, next: NextFunction) {
    const { name, description, collectionId, category, s3Id, s3ThumbnailId, serialNumber, status, cost, salePrice }: CreateInventoryRequest = req.body
    logger.info('[CREATE_INVENTORY] Received request to create inventory', req.body)

    // 1) Validate form
    try {
      validateForm({ name, collectionId })
    } catch (formError) {
      logger.error('[CREATE_INVENTORY] Form fields missing', formError)
      return this.clientError(res)
    }

    // 2) Create inventory
    try {
      const inventory = await InventoryModel.create({
        name,
        description,
        collectionId,
        category,
        s3Id,
        s3ThumbnailId,
        serialNumber,
        status,
        cost,
        salePrice
      })
      logger.info('[CREATE_INVENTORY] Successfully created inventory with id=', inventory.id)
    } catch (createError) {
      logger.error('[CREATE_INVENTORY] Failed to create inventory for collectionId=', collectionId)
      return this.internalServerError(res)
    }
    return this.ok(res)
  }
  // END - create inventory

  // START - delete inventory
  public async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    logger.info('[DELETE_INVENTORY] Received request to delete inventory, id=', id)
    if (!id) {
      logger.error('[DELETE_INVENTORY] Missing inventory id')
      return this.clientError(res)
    }

    try {
      await InventoryModel.destroy({
        where: {
          id
        }
      })
      logger.info('[DELETE_ERROR] Successfully deleted inventory with id=', id)
    } catch (deleteError) {
      logger.error(`[DELETE_ERROR] Failed to delete inventory with id=${id}`, deleteError)
      return this.internalServerError(res)
    }
  }
  // END - delete inventory

  // START - update inventory
  public async update(req: Request, res: Response, next: NextFunction) {
    const { id, name, description, category, collectionId, s3Id, s3ThumbnailId, serialNumber, cost, status, salePrice }: UpdateInventoryRequest = req.body
    logger.info('[UPDATE_INVENTORY] Receive request to update inventory with id=', id)

    // 1) Validate
    if (!id || !collectionId) {
      logger.error('[UPDATE_INVENTORY] Missing id or collection id')
      return this.clientError(res)
    }

    // 2) Update inventory
    // this is a put request so we replace the whole inventory object
    try {
      await InventoryModel.update({
        name,
        description,
        category,
        collectionId,
        s3Id,
        s3ThumbnailId,
        serialNumber,
        cost,
        salePrice,
        status
      }, {
        where: {
          id
        }
      })
    } catch (updateError) {
      logger.error(`[UPDATE_INVENTORY] Failed to update inventory with id=${id}`, updateError)
      return this.internalServerError(res)
    }
  }
  // END - update inventory
}
