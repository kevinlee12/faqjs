let express = require('express');
let router = express.Router();

let ObjectId = require('mongodb').ObjectID;

let checkPermissions = function(req, res, successCallback, errorCallback) {
  const db = req.app.locals.db;
  db.collection('users').findOne(
    { googleId: req.user.googleId },
    function(err, user) {
      if (err) errorCallback(err);

      if ((user !== null) && user.approved) {
        if (successCallback) {
          successCallback(user);
        }
      } else {
        if (errorCallback) {
          errorCallback();
        }
      }
    }
  );
};

router.get('/manage/threads', function(req, res, next) {
  let successCallback = function() {
    return res.render('admin');
  }

  let errorCallback = function() {
    return res.sendStatus(403);
  }
  checkPermissions(req, res, successCallback, errorCallback);
});

router.get('/manage/users', function(req, res, next) {
  let successCallback = function() {
    return res.render('admin');
  }

  let errorCallback = function() {
    return res.sendStatus(403);
  }
  checkPermissions(req, res, successCallback, errorCallback);
});

let checkSecureProtocol = function(req, res, next) {
  if (!req.secure) {
    return res.sendStatus(403);
  }
  next();
};

// Thread Management
// Update a thread
router.post('/thread/update', function(req, res, next) {
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

// Create a thread
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

// Delete a thread
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


// User management

router.get('/users', function(req, res, next) {
  const userCollection = db.collection('users');

  userCollection.find({}).toArray(function(err, docs) {
    if (err) throw err;

    res.send(docs);
  });
});


module.exports = router;
