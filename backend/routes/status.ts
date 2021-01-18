import { Router } from 'express'
import StatusController from '../controllers/status'
import { checkJwt } from '../middlewares/authentication';

const router = Router()
const status = new StatusController()

// Routes from this point onwards requires user to be authenticated
router.use(checkJwt)

// List status
router.route('/list/:collectionId').get((req, res, next) => status.list(req, res, next))

// Create status
router.route('/create').post((req, res, next) => status.create(req, res, next))

// Delete status
router.route('/delete/:name').delete((req, res, next) => status.delete(req, res, next))

export default router
