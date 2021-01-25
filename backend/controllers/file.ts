import aws from 'aws-sdk'
import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import logger from '../logger'
import InventoryModel from '../models/inventory'
import { BaseController } from './base'


aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  region: process.env.S3_REGION
})
const s3 = new aws.S3()

export default class FileController extends BaseController {
  public async upload(req: Request, res: Response, next: NextFunction) {
    const id = req.params.inventoryId
    logger.info('[UPLOAD_FILE] Receive request to upload file for inventory id=', id)
    if (!id || !process.env.S3_BUCKET_NAME) {
      logger.error('[UPLOAD_FILE] missing inventory id or s3 bucket env')
      return this.clientError(res)
    }
    const file = req.file
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
      logger.error(`[UPLOAD_FILE] Illegal file type, got ${file.mimetype}`)
      return this.clientError(res)
    }

    s3.upload({
      ACL: 'public-read',
      Bucket: process.env.S3_BUCKET_NAME,
      Body: fs.createReadStream(file.path),
      ContentType: file.mimetype,
      Key: `iventoryImage/${id}`
    }, async (err, data) => {
      if (err) {
        logger.error('[UPLOAD_FILE] S3 upload error', err)
        return this.internalServerError(res)
      }
      if (data) {
        fs.unlinkSync(file.path)
        const s3Id = data.Location
        try {
          await InventoryModel.update({
            s3Id
          }, {
            where: {
              id
            }
          })
          return this.ok(res)
        } catch (error) {
          logger.error('[UPLOAD_FILE] failed to update inventory s3 id', error)
          return this.internalServerError(res)
        }
      }
    })
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.inventoryId
    logger.info(`[DELETE_FILE] Receive request to delete image for inventory id=${id}`)
    if (!id || !process.env.S3_BUCKET_NAME) {
      logger.error('[DELETE_FILE] Inventory id or s3 bucket env is missing')
      return this.clientError(res)
    }

    s3.deleteObject({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `iventoryImage/${id}`
    }, (err, _data) => {
      if (err) {
        logger.error('[DELETE_FILE] S3 delete file error', err)
        return this.internalServerError(res)
      }
    })

    try {
      await InventoryModel.update({
        s3Id: '',
      }, {
        where: {
          id
        }
      })
      logger.info(`[DELETE_FILE] image deleted for inventory id=${id}`)
      return this.ok(res)
    } catch (inventoryError) {
      logger.error(`[DELETE_FILE] Failed to get inventory with id=${id}`, inventoryError)
      return this.internalServerError(res)
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    const id = req.params.inventoryId
    if (!id || !process.env.S3_BUCKET_NAME) {
      logger.error('[GET_FILE] Inventory id or s3 bucket name env is missing')
      return this.clientError(res)
    }

    const url = s3.getSignedUrl('getObject', {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `iventoryImage/${id}`,
      Expires: 300
    })
    return this.ok(res, {
      url
    })
  }
}
