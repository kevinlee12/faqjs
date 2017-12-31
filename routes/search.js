let express = require('express');
let router = express.Router();

// The following is adapted from
// https://github.com/mongodb/node-mongodb-native/#find-all-documents
const sendAllDocuments = function(db, req, res) {
  // Get the documents collection
  const collection = db.collection('threads');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    if (err) throw err;
    console.log('Found the following records');
    console.log(docs)
    res.send(docs);
  });
};

// The following is adapted from
// https://github.com/mongodb/node-mongodb-native/#find-all-documents
const findAndSendDocuments = function(db, req, res, query) {
  // Get the documents collection
  const collection = db.collection('threads');
  // Find some documents
  collection.find({ $text: { $search: query }}).toArray(
    function(err, docs) {
      if (err) throw err;
      console.log('Found the following records');
      console.log(docs)
      res.send(docs);
    }
  );
};

router.get('/', function(req, res, next) {
  let results = [];
  const db = req.app.locals.db;

  if (req.query.q) {
    findAndSendDocuments(db, req, res, req.query.q);
  } else {
    sendAllDocuments(db, req, res);
  }
});



module.exports = router;
