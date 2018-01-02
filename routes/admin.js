let express = require('express');
let router = express.Router();

let ObjectId = require('mongodb').ObjectID;


router.get('/', function(req, res, next) {
  res.render('admin');
});

let checkSecureProtocol = function(req, res, next) {
  if (!req.secure) {
    return res.sendStatus(403);
  }
  next();
};

router.post('/thread', function(req, res, next) {
  // checkSecureProtocol(req, res, next);
  // Enforce JSON request.
  if (req.get('Content-Type') !== 'application/json; charset=utf-8') {
    return res.sendStatus(403);
  }
  const db = req.app.locals.db;
  const threadCollection = db.collection('threads');

  threadCollection.updateOne(
    { _id: ObjectId(req.body._id) },
    { $set: {
      question: req.body.question,
      answer: req.body.answer
     }
    }, function(err, result) {
      if (err) throw err;
      res.send(req.body);
    });
});

router.post('/thread/create', function(req, res, next) {
  // checkSecureProtocol(req, res, next);
  // Enforce JSON request.
  if (req.get('Content-Type') !== 'application/json; charset=utf-8') {
    return res.sendStatus(403);
  }
  const db = req.app.locals.db;
  const threadCollection = db.collection('threads');

  threadCollection.insertOne(
    {
      question: req.body.question,
      answer: req.body.answer
    }, function(err, result) {
      if (err) throw err;

      res.send(result.ops);
    });
});

router.post('/thread/delete', function(req, res, next) {
  // checkSecureProtocol(req, res, next);

  const db = req.app.locals.db;
  const threadCollection = db.collection('threads');

  threadCollection.deleteOne(
    { _id: ObjectId(req.body._id) },
    function(err, result) {
      if (err) throw err;

      res.send({ status: result.result.n });
    }
  );
})

module.exports = router;
