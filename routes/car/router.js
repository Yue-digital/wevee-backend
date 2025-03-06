import Express from 'express'
import carFetchRouter from './fetch.js'
import carCreateRouter from './create.js'
import carUpdateRouter from './update.js'
function CarRoute(router) {
  const carRouter = Express.Router()

  carFetchRouter(carRouter)
  carCreateRouter(carRouter)
  carUpdateRouter(carRouter)
  router.use(
    '/vehicles',
    carRouter
  )
}

export default CarRoute