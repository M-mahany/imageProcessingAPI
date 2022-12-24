# imageProcessingAPI

first: (ruuning project packages)
installing: npm init
prettier: npm run prettier
eslint: npm run lint
build and test with jasmine: npm run test

to be able to test and use the project

main app listing to port 4000

http://localhost:4000/

the main endpoint is api/image

which can be reached by:
http://localhost:4000/api/image

the available filenames for testing will be shown once entering wron file name as following
encenadaport
fjord
icelandwaterfall
palmunnel
santamonica

the app can resize the image with both or one query

first: (will get the default image from the source folder)
http://localhost:4000/api/image?fjord

second: (will resize the image width only with aspect ratio to the height which will be auto resized)
http://localhost:4000/api/image?fjord&width=300

third: (will resize the image height only with aspect ratio to the width which will be auto resized)
http://localhost:4000/api/image?fjord&height=300








