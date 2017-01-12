const Gallery = require('../models/gallery');

function galleriesIndex(req, res){
  Gallery.find((err, galleries) => {
    if (err) return res.status(500).send();
    return res.status(200).json({ galleries: galleries });
  });
}

module.exports = {
  index: galleriesIndex
};
