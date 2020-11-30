import { Router } from 'express'
import multer from 'multer'

import EstabelecimentosController from './controllers/EstabelecimentosController'
import multerConfig from './config/multer'
const routes = Router()
const upload = multer(multerConfig)

routes.post('/estabelecimentos', upload.array('images'), EstabelecimentosController.create)
routes.get('/estabelecimentos', EstabelecimentosController.index)
routes.get('/estabelecimentos/:id', EstabelecimentosController.show)


export default routes