import Express from 'express'
import connect from './helpers/models.js'
import cors from 'cors'
import knex from 'knex'
import Routes from './routes/index.js'
import client from './helpers/client.js'
const App = () => {
  const init = () => {
  
    connect(client)
    const app = Express()

    const corOptions = {
      origin: true,
      credentials: true,
      optionsSuccessStatus: 200,
    }

    app.options('*', cors(corOptions))
    app.use(cors(corOptions))

    app.use(Express.json())
    app.use(
      Express.urlencoded({
        extended: true,
      })
    )

    Routes(app).register()

    return app
  }

  return {
    init,
  }
}

export default App
