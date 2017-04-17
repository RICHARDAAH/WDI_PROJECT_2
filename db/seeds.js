const mongoose      = require('mongoose');

const databaseUrl   = process.env.MONGOLAB_URI || 'mongodb://localhost/galleries';
mongoose.connect(databaseUrl);

const Gallery       = require('../models/gallery');

Gallery.collection.drop();
