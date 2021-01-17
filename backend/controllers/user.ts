import { NextFunction, Request, Response } from "express";
import { CreateUserRequest } from "../interfaces/user";
import logger from "../logger";
import UserModel from "../models/user";
import auth0Client, { getAuth0Token } from "../services/auth0";
import { validateForm } from "../utils/form";
import { BaseController } from "./base";

export default class UserController extends BaseController {
  public async create(req: Request, res: Response, next: NextFunction) {
    logger.info('[CREATE_USER] Create user initiated', req.body)
    const { firstName, lastName, email, password }: CreateUserRequest = req.body

    // 1) Validate form
    try {
      validateForm({ firstName, lastName, email, password })
    } catch (formError) {
      logger.error('[CREATE_USER] Missing fields', formError)
      return this.clientError(res)
    }

    // 2) Get Auth0 access token
    let token = ''
    try {
      token = await getAuth0Token()
      logger.info('[CREATE_USER] Received Auth0 access token')
    } catch (tokenError) {
      logger.error('[CREATE_USER] Failed to get auth token', tokenError)
      return this.internalServerError(res)
    }

    // 3) Use access token to create user in Auth0
    let auth0Id = ''
    try {
      const resp = await auth0Client.post(
        '/api/v2/users',
        {
          email: email,
          connection: process.env.AUTH0_CONNECTION,
          password
        },
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      )
      auth0Id = resp.data.user_id
      logger.info('[CREATE_USER] Successfully created user in Auth0')
    } catch (auth0Error) {
      logger.error('[CREATE_USER] Failed to create user in Auth0', auth0Error)
      return this.internalServerError(res)
    }

    // 4) Add user to db with Auth0 user id
    try {
      const user = await UserModel.create({
        firstName,
        lastName,
        email,
        auth0Id
      })
      logger.info('[CREATE_USER] User successfully created, user id=', user.id)
    } catch (userError) {
      logger.error('[CREATE_USER] Failed to create user', userError)
      return this.internalServerError(res)
    }
    return this.ok(res)
  }
}
