import Router, { Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import {
  resizeImgWidth,
  resizeImgHeight,
  resizeImgWH,
} from '../../utilities/sharpResize'

const imageRoute = Router()

imageRoute.get('/image', (req: Request, res: Response) => {
  const imgWidth = req.query.width as string
  const imgHeight = req.query.height as string
  const imgName = req.query.filename as string
  const imageDir = path.join(__dirname, `../../../sourceImage/${imgName}.jpg`)

  if (imgName === undefined) {
    return res
      .status(400)
      .send('unrecognized query please use {filename} to continue')
  }

  if (fs.existsSync(imageDir) === false) {
    const folderPath = path.join(__dirname, '../../../sourceImage/')
    const filesName: string[] = []
    fs.readdirSync(folderPath).map((file) => {
      const fileO = path.parse(file).name
      filesName.push(fileO)
    })
    return res
      .status(404)
      .send(
        `filename does not exists please use one of the file names: ${filesName}`
      )
  }

  if (imgWidth === undefined && imgHeight === undefined) {
    return res.sendFile(imageDir)
  }

  if (typeof imgWidth === 'string' && imgHeight === undefined) {
    const width: number = parseInt(imgWidth)
    const outputFileNew = path.join(
      __dirname,
      '../../../resizedImages/' + imgName + '-resized width-' + width + '.jpg'
    )
    if (!Number.isNaN(width) && width > 0) {
      if (fs.existsSync(outputFileNew) === false) {
        resizeImgWidth(imageDir, width, imgHeight, imgName)

        setTimeout(() => {
          return res.status(200).sendFile(outputFileNew)
        }, 500)
      }
      if (fs.existsSync(outputFileNew) === true) {
        return res.status(200).sendFile(outputFileNew)
      }
    }

    if (!Number.isNaN(width) && width <= 0) {
      res.status(400).send('please use a number greater than 0')
    }

    if (Number.isNaN(width)) {
      res.status(400).send('please use number not a string')
    }
  }

  if (typeof imgHeight === 'string' && imgWidth === undefined) {
    const height: number = parseInt(imgHeight)
    const outFilenewHeight = path.join(
      __dirname,
      '../../../resizedImages/' + imgName + '-resized height-' + height + '.jpg'
    )
    if (!Number.isNaN(height) && height > 0) {
      if (fs.existsSync(outFilenewHeight) === false) {
        resizeImgHeight(imageDir, imgWidth, height, imgName)

        setTimeout(() => {
          return res.status(200).sendFile(outFilenewHeight)
        }, 500)
      }

      if (fs.existsSync(outFilenewHeight) === true) {
        return res.status(200).sendFile(outFilenewHeight)
      }
    }

    if (!Number.isNaN(height) && height <= 0) {
      res.status(400).send('please use a number greater than 0')
    }

    if (Number.isNaN(height)) {
      res.status(400).send('please use number not a string')
    }
  }
  if (typeof imgWidth === 'string' && typeof imgHeight === 'string') {
    const width: number = parseInt(imgWidth)
    const height: number = parseInt(imgHeight)
    if (Number.isNaN(width) || Number.isNaN(height)) {
      return res
        .status(400)
        .send(
          'Error! please use number not a string greater than 0 {width=number} {height=number}'
        )
    }
    if (
      !Number.isNaN(width) &&
      !Number.isNaN(height) &&
      width > 0 &&
      height > 0
    ) {
      const outFilenewWH = path.join(
        __dirname,
        '../../../resizedImages/' +
          imgName +
          '-' +
          width +
          '-' +
          height +
          '.jpg'
      )
      if (fs.existsSync(outFilenewWH) === false) {
        resizeImgWH(imageDir, width, height, imgName)
        setTimeout(() => {
          return res.status(200).sendFile(outFilenewWH)
        }, 500)
      }
      if (fs.existsSync(outFilenewWH) === true) {
        return res.status(200).sendFile(outFilenewWH)
      }
    }
    if (
      !Number.isNaN(width) &&
      !Number.isNaN(height) &&
      (width <= 0 || height <= 0)
    ) {
      res.status(400).send('please use number greater than 0')
    }
  }
})

export default imageRoute
