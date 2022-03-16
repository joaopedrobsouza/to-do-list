var express = require('express');
var router = express.Router();
var mongoUtil = require('../services/db')
const { ObjectId } = require('mongodb')

mongoUtil.connectToServer(function (err) {
  if (err) console.log(err);

  router.get('/list', function (req, res, next) {
    mongoUtil.findDocuments('to-do').then(data => {
      res.send({ data })
    })
  });

  router.put('/update', function (req, res, next) {
    const { text, active, edit } = req.body
    mongoUtil.updateDocument('to-do',
      { _id: ObjectId(req.body._id) },
      { text, active, edit }
    ).then(data => {
      res.send({ data })
    });
  });

  router.post('/insert', function (req, res, next) {
    console.log(req.body)
    mongoUtil.insertDocument('to-do', req.body).then(data => {
      res.send({ data })
    })
  });

  router.delete('/delete', function (req, res, next) {
    mongoUtil.removeDocument('to-do', { _id: ObjectId(req.body._id) }).then(data => {
      res.send({ data })
    })
  });
})

module.exports = router;
