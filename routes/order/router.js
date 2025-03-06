import Express from 'express'
import OrderCreateRouter from './create.js'
import OrderFetchRouter from './fetch.js'
import OrderUpdateRouter from './update.js'
function OrderRoute(router) {
  const orderRouter = Express.Router()

  OrderCreateRouter(orderRouter)
  OrderFetchRouter(orderRouter)
  OrderUpdateRouter(orderRouter)
  router.use(
    '/orders',
    orderRouter
  )
}

export default OrderRoute