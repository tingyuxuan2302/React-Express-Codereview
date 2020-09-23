module.exports = {
  port: 3000,
  session: {
    secret: 'codereview',
    key: 'codereview',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/express-react-codereview'
}
