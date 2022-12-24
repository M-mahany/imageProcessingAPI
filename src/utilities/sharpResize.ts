import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

function resizeImgWidth(
  imgDir: string,
  wid: number,
  hgt: number,
  name: string
) {
  const outFilenewWidth = path.join(
    __dirname,
    '../../resizedImages/' + name + '-resized width-' + wid + '.jpg'
  )
  const directory = path.join(__dirname, '../../resizedImages')
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory)
  }

  sharp(imgDir).resize({ width: wid, height: hgt }).toFile(outFilenewWidth)
}

function resizeImgHeight(
  imgDir: string,
  wid: number,
  hgt: number,
  name: string
) {
  const outFilenewHeight = path.join(
    __dirname,
    '../../resizedImages/' + name + '-resized height-' + hgt + '.jpg'
  )
  const directory = path.join(__dirname, '../../resizedImages')
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory)
  }

  sharp(imgDir).resize({ width: wid, height: hgt }).toFile(outFilenewHeight)
}

function resizeImgWH(imgDir: string, wid: number, hgt: number, name: string) {
  const outFilenewWH = path.join(
    __dirname,
    '../../resizedImages/' + name + '-' + wid + '-' + hgt + '.jpg'
  )
  const directory = path.join(__dirname, '../../resizedImages')
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory)
  }

  sharp(imgDir).resize({ width: wid, height: hgt }).toFile(outFilenewWH)
}

export { resizeImgWidth, resizeImgHeight, resizeImgWH }
