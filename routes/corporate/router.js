import Express from 'express'
import CorporateFetchRouter from './fetch.js'
import updateCorporateRouter from './update.js'
function CorporateRoute(router) {
  const corporateRouter = Express.Router()

  CorporateFetchRouter(corporateRouter)
  updateCorporateRouter(corporateRouter)
  router.use(
    '/corporate',
    corporateRouter
  )
}

export default CorporateRoute