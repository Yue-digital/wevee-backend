import Express from 'express'
import CalculationFetchRoute from './fetch.js'
function CalculationRoute(router) {
  const calculationRouter = Express.Router()

  CalculationFetchRoute(calculationRouter)
  router.use(
    '/calculation',
    calculationRouter
  )
}

export default CalculationRoute