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
  const imageDir = path.join(__dirname, `../../sourceImage/${imgName}.jpg`)

  if (imgName === undefined) {
    return res
      .status(400)
      .send('unrecognized query please use {filename} to continue')
  }

  if (fs.existsSync(imageDir) === false) {
    const folderPath = path.join(__dirname, '../../sourceImage/')
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
    if (!Number.isNaN(width) && width > 0) {
      const outputFile = path.join(
        __dirname,
        `../../sourceImage/${imgName}width${width}.jpg`
      )
      const sharpresize = async () => {
        await sharp(imageDir)
          .resize({ width: width, height: imgHeight })
          .toBuffer()
          .then((data) => {
            fsPromises.writeFile(outputFile, data)
          })
      }

      sharpresize()

      setTimeout(() => {
        res.status(200).sendFile(outputFile)
      }, 1000)
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
    if (!Number.isNaN(height) && height > 0) {
      const outputFile = path.join(
        __dirname,
        `../../sourceImage/${imgName}height${height}.jpg`
      )
      const sharpresize = async () => {
        await sharp(imageDir)
          .resize({ width: imgWidth, height: height })
          .toBuffer()
          .then((data) => {
            fsPromises.writeFile(outputFile, data)
          })
      }

      sharpresize()

      setTimeout(() => {
        res.status(200).sendFile(outputFile)
      }, 1000)
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
      const outputFile = path.join(
        __dirname,
        `../../sourceImage/${imgName}${width}x${height}.jpg`
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
