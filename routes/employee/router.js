import Express from 'express'
import EmployeeFetchRouter from './fetch.js'
import EmployeeUpdateRouter from './update.js'
function EmployeeRoute(router) {
  const employeeRouter = Express.Router()

  EmployeeFetchRouter(employeeRouter)
  EmployeeUpdateRouter(employeeRouter)
  router.use(
    '/employee',
    employeeRouter
  )
}

export default EmployeeRoute