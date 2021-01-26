import { Router } from 'express'
import UserControllers from '../controllers/user'
import { checkJwt } from '../middlewares/authentication';

const router = Router()
const user = new UserControllers()

// Create user
router.route('/create').post((req, res, next) => user.create(req, res, next))

// Routes from this point onwards requires user to be authenticated
router.use(checkJwt)

// Find user
router.route('/find/:email').get((req, res, next) => user.find(req, res, next))

export default router
