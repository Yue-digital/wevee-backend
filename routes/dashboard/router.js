import Express from 'express'
import dashboardFetchRouter from './fetch.js'
import dashboardCreateRouter from './create.js'
import dashboardUpdateRouter from './update.js'
function DashboardRoute(router) {
  const dashboardRouter = Express.Router()

  dashboardFetchRouter(dashboardRouter)
  dashboardCreateRouter(dashboardRouter)
  dashboardUpdateRouter(dashboardRouter)
  router.use(
    '/dashboard',
    dashboardRouter
  )
}

export default DashboardRoute