import { Router } from 'express'
import { checkJwt } from '../middlewares/authentication'
import multer from 'multer'
import FileController from '../controllers/file'

const router = Router()
const file = new FileController()

// Routes from this point onwards requires user to be authenticated
router.use(checkJwt)

// List collections
router.route('/upload/:inventoryId').post(
  multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).single('inventory'),
  (req, res, next) => file.upload(req, res, next)
)

router.route('/delete/:inventoryId').delete((req, res, next) => file.delete(req, res, next))

router.route('/get/:inventoryId').get((req, res, next) => file.get(req, res, next))

export default router
