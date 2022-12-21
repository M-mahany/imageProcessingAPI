import Router, { Request, Response } from 'express'
import path from 'path'
import { promises as fsPromises } from 'fs'
import fs from 'fs'
import sharp from 'sharp'

const imageRoute = Router()

imageRoute.get('/image', (req: Request, res: Response) => {
  const imgWidth = req.query.width as string
  const imgHeight = req.query.height as string
  const imgName = req.query.filename as string
  const imageDir = path.join(__dirname, `/../../../sourceImage/${imgName}.jpg`)

  if (imgName === undefined) {
    return res
      .status(400)
      .send('unrecognized query please use {filename} to continue')
  }
  if (fs.existsSync(imageDir) === false) {
    return res.status(404).send('filename does not exists')
  }
  if (imgWidth === undefined && imgHeight === undefined) {
    return res.sendFile(imageDir)
  }
  if (typeof imgWidth === 'string' && imgHeight === undefined) {
    return res
      .status(400)
      .send(
        'Error please add {height} parameter and assign with nummber {height=number} and make sure you are using number {width=number}'
      )
  }
  if (typeof imgHeight === 'string' && imgWidth === undefined) {
    return res
      .status(400)
      .send(
        'Error! please add {width} parameter and assign with nummber {width=number} and make sure you are using number {height=number}'
      )
  }
  if (typeof imgWidth === 'string' && typeof imgHeight === 'string') {
    const width: number = parseInt(imgWidth)
    const height: number = parseInt(imgHeight)
    if (Number.isNaN(width) || Number.isNaN(height)) {
      return res
        .status(400)
        .send('Error! please use number instead {width=number} {height=number}')
    }
    const outputFile = path.join(
      __dirname,
      `/../../../sourceImage/${imgName}${width}x${height}.jpg`
    )
    const sharpresize = async () => {
      await sharp(imageDir)
        .resize({ width: width, height: height })
        .toBuffer()
        .then((data) => {
          fsPromises.writeFile(outputFile, data)
        })
    }

    sharpresize()

    setTimeout(() => {
      res.status(200).sendFile(outputFile)
    }, 500)
  }
})

export default imageRoute
