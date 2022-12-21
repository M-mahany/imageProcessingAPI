import { Request, Response, Router } from 'express'
import imageRoute from './routes/routes'

const mainRouter = Router()

mainRouter.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Welcome to my Resize App Project')
})

mainRouter.use('/api', imageRoute)

export default mainRouter
