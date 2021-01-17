import { NextFunction, Request, Response } from "express";
import { CreateCollectionRequest, UpdateCollectionRequest } from "../interfaces/collection";
import logger from "../logger";
import CollectionModel from "../models/collection";
import { validateForm } from "../utils/form";
import { BaseController } from "./base";

export default class CollectionController extends BaseController {
  public async create(req: Request, res: Response, next: NextFunction) {
    const { name, userId, s3Id, s3ThumbnailId }: CreateCollectionRequest = req.body
    // 1) Validate form
    try {
      validateForm({ name, userId })
    } catch (formError) {
      logger.error('[CREATE_COLLECTION] Missing form fields', formError)
      return this.clientError(res)
    }

    // 2) Create collection
    try {
      const collection = await CollectionModel.create({
        name,
        userId,
        s3Id,
        s3ThumbnailId
      })
      logger.info('[CREATE_COLLECTION] Successfully created collection, id=', collection.getDataValue("id"))
    } catch (collectionError) {
      logger.error('[CREATE_COLLECTION] Failed to create collection', collectionError)
      return this.internalServerError(res)
    }
    return this.ok(res)
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const { id, name, userId, s3Id, s3ThumbnailId }: UpdateCollectionRequest = req.body
    // 1) Validate form
    try {
      validateForm({ name, userId })
    } catch (formError) {
      logger.error('[CREATE_COLLECTION] Missing form fields', formError)
      return this.clientError(res)
    }

    // 2) Update collection
    try {
      const collection = CollectionModel.update({
        name,
        userId,
        s3Id,
        s3ThumbnailId
      }, {
        where: {
          id
        }
      })
      logger.info('[UPDATE_COLLECTION] Successfully update collection', collection)
    } catch (updateError) {
      logger.error('[UPDATE_COLLECTION] Failed to update collection')
    }
    return this.ok(res)
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    logger.info('[DELETE_COLLECTION] Delete collection initiated')
    const id = req.params.id

    // 1) Validate
    if (!id) {
      logger.error('[DELETE_COLLECTION] Collection id is missing, delete failed')
      return this.clientError(res)
    }

    // 2) Delete collection from db
    try {
      await CollectionModel.destroy({
        where: {
          id
        }
      })
      logger.info('[DELETE_COLLECTION] Collection deleted, id=', id)
    } catch (error) {
      logger.error('[DELETE_COLLECTION] Faileld to delete collection, id=', id)
      return this.internalServerError(res)
    }
    return this.ok(res)
  }
}
