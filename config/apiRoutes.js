const express  = require('express');
const router   = express.Router();

const authentications = require('../controllers/authentications');
const users           = require('../controllers/users');
const galleries           = require('../controllers/galleries');

router.route('/register')
.post(authentications.register);
router.route('/login')
.post(authentications.login);

router.route('/galleries')
.get(galleries.index);

router.route('/users')
.get(users.index);
router.route('/users/:id')
.get(users.show)
.put(users.update)
.delete(users.delete);

module.exports = router;
