import App from './app.js'

const PORT = 3001
const app = App().init()

const service = app.listen(PORT, () => {
  console.info(`server is running on port ${PORT}`)
})

const shutdown = () => service.close()

process.on('exit', shutdown)
process.on('SIGTERM', shutdown)
