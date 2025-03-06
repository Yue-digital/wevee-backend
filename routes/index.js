import Express from 'express'
// if this gets bigger probably loop this one
import AdmintRoute from './portal/router.js'
import DashboardRoute from './dashboard/router.js'
import UserRoute from './user/router.js'
import CarRoute from './car/router.js'
import OrderRoute from './order/router.js'
import PDFRoute from './pdf/router.js'
import EmployeeRoute from './employee/router.js'
import SubdealerRoute from './subdealer/router.js'
import CorporateRoute from './corporate/router.js'
import FavoriteRoute from './favorites/router.js'
import CalculationRoute from './calculation/router.js'
const REGISTERED = [
    'admin',
    'dashboard',
    'user',
    'cars',
    'order',
    'pdf',
    'employee',
    'subdealer',
    'corporate',
    'favorite',
    'calculation'
]

const Routes = (app, routes = REGISTERED) => {
  const publicRouter = Express.Router()
  const router = Express.Router()
  const secureRouter = Express.Router()

  const register = () => {

    if (hasRoute('admin')) {
        AdmintRoute(publicRouter)
    }

    if(hasRoute('dashboard')){
      DashboardRoute(publicRouter)
    }

    if (hasRoute('user')) {
      UserRoute(publicRouter)
    }
    if (hasRoute('cars')) {
      CarRoute(publicRouter)
    }

    if (hasRoute('order')) {
      OrderRoute(publicRouter)
    }

    if (hasRoute('pdf')) {
      PDFRoute(publicRouter)
    }

    if (hasRoute('employee')) {
      EmployeeRoute(publicRouter)
    }

    if (hasRoute('subdealer')) {
      SubdealerRoute(publicRouter)
    }

    if (hasRoute('corporate')) {
      CorporateRoute(publicRouter)
    }

    if (hasRoute('favorite')) {
      FavoriteRoute(publicRouter)
    }

    if (hasRoute('calculation')) {
      CalculationRoute(publicRouter)
    }
  
    router.use('', publicRouter)
    // router.use('', authMiddlewares.authenticate, secureRouter)

    app.use('', router)
  }

  const hasRoute = routeGroup => {
    return routes.indexOf(routeGroup) >= 0
  }

  return {
    register,
  }
}

export default Routes