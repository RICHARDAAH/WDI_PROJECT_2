module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGOD_URI || 'mongodb://localhost/galleries',
  secret: process.env.SECRET || 'Its a secret!'
};
