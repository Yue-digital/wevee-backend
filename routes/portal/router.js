import Express from 'express'
import adminCreateRouter from './create.js'
import adminLoginRouter from './login.js'
function AdmintRoute(router) {
  const adminRouter = Express.Router()

  adminCreateRouter(adminRouter)
  adminLoginRouter(adminRouter)
  router.use(
    '/admin',
    adminRouter
  )
}

export default AdmintRoute