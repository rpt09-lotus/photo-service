const express = require('express');
const router = express.Router({mergeParams: true});
const db = require('../database-postgresql/helpers');

router.get('/photos', (req, res) => {
  var sortOrder = req.query.sort || null;
  var validSortOrder = ['asc', 'desc', null];
  if (!validSortOrder.includes(sortOrder)) {
    res.status(400).end('Invalid sort order');
  } else {
    db.getPhotos(req.params.trailId, sortOrder, result => {
      res.send(result);
    });
  }
});

router.get('/photosCount', (req, res) => {
  db.getPhotosCount(req.params.trailId, result => {
    res.send(result);
  });
});

router.get('/heroPhoto', (req, res) => {
  db.getHeroPhoto(req.params.trailId, result => {
    res.send(result);
  });
});

//For testing
module.exports = router;