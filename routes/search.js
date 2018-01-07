let express = require('express');
let router = express.Router();

let esBuilder = require('elastic-builder');

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
const findAndSendDocumentsDB = function(db, req, res, query) {
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

const findAndSendDocumentsElastic = function(req, res, query, next) {
  const esClient = req.app.locals.esClient;

  const queryBody = new esBuilder.MultiMatchQuery(
      ['question', 'answer'], query)
    .fuzziness('AUTO');

  const requestBody = new esBuilder.RequestBodySearch()
    .query(queryBody);

  esClient.search({
    index: 'faq',
    body: requestBody.toJSON()
  }, function(err, result) {
    if (err) throw err;

    if (next) next(result);
  })
};

router.get('/', function(req, res, next) {
  let results = [];
  const db = req.app.locals.db;

  let sendResults = function(results) {
    const resultObjects = results.hits.hits;
    let sendResults = resultObjects.map(function(result) {
      return {
        _id: result._id,
        question: result._source.question,
        answer: result._source.answer
      };
    });

    return res.send(sendResults);
  }

  if (req.query.q) {
    findAndSendDocumentsElastic(req, res, req.query.q, sendResults);
    // findAndSendDocuments(db, req, res, req.query.q);
  } else {
    sendAllDocuments(db, req, res);
  }
});



module.exports = router;
