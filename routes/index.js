let express = require('express');
let router = express.Router(); // eslint-disable-line new-cap

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'NextGen FAQ'});
});

module.exports = router;
