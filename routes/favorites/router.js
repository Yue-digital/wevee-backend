import Express from 'express'
import favoriteFetchRouter from './fetch.js'
function FavoriteRoute(router) {
  const favoriteRouter = Express.Router()

  favoriteFetchRouter(favoriteRouter)
  router.use(
    '/favorites',
    favoriteRouter
  )
}

export default FavoriteRoute