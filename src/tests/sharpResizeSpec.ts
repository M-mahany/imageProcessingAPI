import path from 'path'
import { resizeImgWH } from '../utilities/sharpResize'

describe('Testing sharp image processing function file to test its functionality', () => {
  it('giving random width and height to the sharp file function to see if it works and process image', async (): Promise<void> => {
    const imagePtah = path.join(__dirname, '../../sourceImage/fjord.jpg')
    const imageprocessing = await resizeImgWH(imagePtah, 400, 400, 'fjord')
    expect(imageprocessing).toBeTruthy
  })
})
