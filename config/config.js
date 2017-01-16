module.exports = {
  port: process.env.PORT || 3000,
  db: 'mongodb://localhost/galleries',
  secret: process.env.SECRET || 'Its a secret!'
};
