import supertest from 'supertest'
import app from '..'
import fs from 'fs'
import path from 'path'

const request = supertest(app)

describe('testing main endpoint for server app', () => {
  it('Get the  main /endpoint', async () => {
    const response = await request.get('/')
    expect(response.text).toBe('Welcome to my Resize App Project')
  })
})

describe('testing server query in case of success and failure', () => {
  it('testing query if success will get image', async () => {
    const response = await request.get('/api/image?filename=fjord')
    expect(response.status).toBe(200)
  })
  it('testing query if missing or not correctly typed as {filename=}', async () => {
    const response = await request.get('/api/image?')
    expect(response.status).toBe(400)
  })
})

describe('testing by filename', () => {
  it('testing if image file is not exists will responde with Error 404', async () => {
    const response = await request.get('/api/image?filename=flord')
    expect(response.status).toBe(404)
  })
})

describe('testing by query width and height for reszing', () => {
  it('testing query if one of them are missing will resize the given query only with aspec ratio', async () => {
    const response = await request.get('/api/image?filename=fjord&width=300')
    expect(response.status).toBe(200)
  })
  it('testing if width and height provided will either get filename if exists or resize image and fetch it', async () => {
    const response = await request.get(
      '/api/image?filename=fjord&width=300&height=300'
    )
    expect(response.status).toBe(200)
    expect(response.type).toBe('image/jpeg')
  })
  it('if one of query is not a number will thorw and error asking to provide number not string', async () => {
    const response = await request.get(
      '/api/image?filename=fjord&width=hello&height=300'
    )
    expect(response.status).toBe(400)
  })
})
describe('test if resized image was created in this test', () => {
  it('let test by deleting the test image', async () => {
    const resizedimgTest = path.join(
      __dirname,
      '../../resizedImages/fjord-300-300.jpg'
    )

    fs.unlink(resizedimgTest, (err) => {
      if (err) throw err
      console.log(`successfully deleted ${resizedimgTest}`)
    })
  })
})
