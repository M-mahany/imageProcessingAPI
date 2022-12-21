import express from 'express'
import mainRouter from './api'

const app = express()
const port = 4000

app.use('/', mainRouter)

app.listen(port, () => {
  console.log(`app is connected successfully to localhost:${port}`)
})

export default app
