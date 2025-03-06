import Express from 'express'
import SubdealerFetchRouter from './fetch.js'
function SubdealerRoute(router) {
  const subdealerRouter = Express.Router()

  SubdealerFetchRouter(subdealerRouter)
  router.use(
    '/sub-dealer',
    subdealerRouter
  )
}

export default SubdealerRoute