let express = require('express');
let router = express.Router(); // eslint-disable-line new-cap

let objectId = require('mongodb').ObjectID;

let checkPermissions = function(req, res, successCallback, errorCallback) {
  const db = req.app.locals.db;

  if (req.user === null || req.user === undefined) {
    return res.redirect('/auth/google');
  }

  db.collection('users').findOne(
    {googleId: req.user.googleId},
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
  };

  let errorCallback = function() {
    return res.sendStatus(403);
  };
  checkPermissions(req, res, successCallback, errorCallback);
});

router.get('/manage/users', function(req, res, next) {
  let successCallback = function() {
    return res.render('admin');
  };

  let errorCallback = function() {
    return res.sendStatus(403);
  };
  checkPermissions(req, res, successCallback, errorCallback);
});

router.get('/manage/elastic', function(req, res, next) {
  let successCallback = function() {
    return res.render('admin');
  };

  let errorCallback = function() {
    return res.sendStatus(403);
  };
  checkPermissions(req, res, successCallback, errorCallback);
});

router.get('/manage/site', function(req, res, next) {
  let successCallback = function() {
    return res.render('admin');
  };

  let errorCallback = function() {
    return res.sendStatus(403);
  };
  checkPermissions(req, res, successCallback, errorCallback);
});

router.get('/manage/db', function(req, res, next) {
  let successCallback = function() {
    return res.render('admin');
  };

  let errorCallback = function() {
    return res.sendStatus(403);
  };
  checkPermissions(req, res, successCallback, errorCallback);
});

// TODO: Reactivate
// let checkSecureProtocol = function(req, res, next) {
//   if (!req.secure) {
//     return res.sendStatus(403);
//   }
//   next();
// };

const createOrUpdateThreadElastic = function(req, res, obj, next) {
  const esClient = req.app.locals.esClient;

  esClient.index({
    index: 'faq',
    type: 'faq',
    id: obj._id,
    body: {
      question: obj.question,
      answer: obj.answer,
    },
  }, function(err, response) {
    if (err) throw err;

    if (next) {
      next(obj);
    }
  });
};

const deleteThreadElastic = function(req, res, obj, next) {
  const esClient = req.app.locals.esClient;

  esClient.delete({
    index: 'faq',
    type: 'faq',
    id: obj._id,
  }, function(err, response) {
    if (err) throw err;

    if (next) {
      next(obj);
    }
  });
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
    {_id: objectId(req.body._id)},
    {$set: {
      question: req.body.question,
      answer: req.body.answer,
      },
    }, function(err, result) {
      if (err) throw err;

      createOrUpdateThreadElastic(req, res, req.body);
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
      answer: req.body.answer,
    }, function(err, result) {
      if (err) throw err;

      createOrUpdateThreadElastic(req, res, req.body);
      res.send(result.ops);
    });
});

// Delete a thread
router.post('/thread/delete', function(req, res, next) {
  // checkSecureProtocol(req, res, next);

  const db = req.app.locals.db;
  const threadCollection = db.collection('threads');

  threadCollection.deleteOne(
    {_id: objectId(req.body._id)},
    function(err, result) {
      if (err) throw err;

      deleteThreadElastic(req, res, req.body);
      res.send({status: result.result.n});
    }
  );
});

// User management

router.get('/users', function(req, res, next) {
  const db = req.app.locals.db;
  const userCollection = db.collection('users');

  return userCollection.find({}).toArray(function(err, docs) {
    if (err) throw err;

    res.send(docs);
  });
});

// Update a user
router.post('/user/update', function(req, res, next) {
  // checkSecureProtocol(req, res, next);
  // Enforce JSON request.
  if (req.get('Content-Type') !== 'application/json; charset=utf-8') {
    return res.sendStatus(403);
  }
  const db = req.app.locals.db;
  const userCollection = db.collection('users');

  userCollection.updateOne(
    {_id: objectId(req.body._id)},
    {$set: {
      displayName: req.body.displayName,
      email: req.body.email,
      approved: req.body.approved,
      },
    }, function(err, result) {
      if (err) throw err;
      res.send(req.body);
    });
});

// Create a thread
router.post('/user/create', function(req, res, next) {
  // checkSecureProtocol(req, res, next);
  // Enforce JSON request.
  if (req.get('Content-Type') !== 'application/json; charset=utf-8') {
    return res.sendStatus(403);
  }
  const db = req.app.locals.db;
  const userCollection = db.collection('users');

  userCollection.insertOne(
    {
      displayName: req.body.displayName,
      email: req.body.email,
      approved: req.body.approved,
    }, function(err, result) {
      if (err) throw err;

      res.send(result.ops);
    }
  );
});

// Delete a thread
router.post('/user/delete', function(req, res, next) {
  // checkSecureProtocol(req, res, next);

  const db = req.app.locals.db;
  const userCollection = db.collection('users');

  userCollection.deleteOne(
    {_id: objectId(req.body._id)},
    function(err, result) {
      if (err) throw err;

      res.send({status: result.result.n});
    }
  );
});

const siteConfigTemplate = {
  siteName: 'FAQ',
  motherSite: 'localhost:3000',
};


// DB Management
router.post('/db/create', function(req, res, next) {
  const db = req.app.locals.db;

  const createCollection = function(collectionName) {
    db.createCollection(collectionName, function(err, res) {
      if (err) throw err;
      console.log('Collection created for ' + collectionName);
    });
  };

  if (req.body.collectionName == 'threads') {
    createCollection('threads');
  } else if (req.body.collectionName == 'siteConfig') {
    createCollection('siteConfig');

    insertionTemplate = siteConfigTemplate;
    insertionTemplate['_id'] = 'siteSettings';
    db.collection('siteConfig').insertOne(
      insertionTemplate,
      function(err, result) {
        if (err) throw err;
        res.send(result.ops);
      }
    );
  }
});

router.post('/db/drop', function(req, res, next) {
  const db = req.app.locals.db;

  const dropCollection = function(collectionName) {
    db.collection(collectionName).drop(function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log('Collection ' + collectionName + ' deleted');
    });
  };

  if (req.body.collectionName == 'threads') {
    dropCollection('threads');
  } else if (req.body.collectionName == 'siteConfig') {
    dropCollection('siteConfig');
  }
});

// Site Management
router.get('/site/view', function(req, res, next) {
  const db = req.app.locals.db;
  const siteConfigCollection = db.collection('siteConfig');

  processedSiteConfig = {};
  for (let key in siteConfigTemplate) {
    if (processedSiteConfig.hasOwnProperty(key)) {
      processedSiteConfig[key] = true;
    }
  }

  siteConfigCollection.findOne(
    {_id: 'siteSettings'},
    processedSiteConfig,
    function(err, result) {
      if (err) throw err;

      console.log(result);
      res.send(result);
    }
  );
});

router.post('/site/edit', function(req, res, next) {
  let siteConfig = req.body.siteConfig;
  let processedSiteConfig = {};

  // The following is to ensure that the supplied input only has
  // whitelisted keys.
  for (let key in siteConfigTemplate) {
    if (siteConfig.hasOwnProperty(key)) {
      processedSiteConfig[key] = siteConfig[key];
    }
  }

  const db = req.app.locals.db;
  const siteConfigCollection = db.collection('siteConfig');
  siteConfigCollection.updateOne(
    {_id: 'siteSettings'},
    {$set: processedSiteConfig},
    function(err, result) {
      if (err) throw err;
      res.send(result.ops);
    }
  );
});

// Elastic Management
router.get('/elastic/create_index', function(req, res, next) {
  const esClient = req.app.locals.esClient;

  esClient.indices.create({index: 'faq'});
});

module.exports = router;
