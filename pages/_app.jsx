{
  "name": "letsdali-api-v1",
  "version": "1.0.0",
  "description": "The next big design, insights and analytics app.",
  "main": "app.js",
  "scripts": {
    "dev": "nodemon app.js",
    "prod": "pm2 start app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/letsdali/letsdali-api-v1.git"
  },
  "author": "Fabian Ferno",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/letsdali/letsdali-api-v1/issues"
  },
  "homepage": "https://github.com/letsdali/letsdali-api-v1#readme",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "ejs": "^3.1.6",
    "express": "^4.17.1",
    "express-openid-connect": "^2.5.2",
    "helmet": "^4.6.0",
    "morgan": "^1.10.0",
    "nocache": "^3.0.1",
    "nodemon": "^