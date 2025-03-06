import Express from 'express'
import userFetchRouter from './fetch.js'
import loginRouter from './login.js'
import userCreateRouter from './create.js'
import userUpdateRouter from './update.js'
function UserRoute(router) {
  const userRouter = Express.Router()

  userFetchRouter(userRouter)
  loginRouter(userRouter)
  userCreateRouter(userRouter)
  userUpdateRouter(userRouter)
  router.use(
    '/user',
    userRouter
  )
}

export default UserRoute