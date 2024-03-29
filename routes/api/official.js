const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');

/* GET dealers list */
router.get(
  '/dealers',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    var _pageNumber = parseInt(req.query.page) || 1,
      _pageSize = parseInt(req.query.size);

    let query = { roles: 'dealer' };

    if (req.query.search !== '' && req.query.search !== undefined) {
      query['$text'] = { $search: req.query.search };
    }

    User.countDocuments(query).then(totalCount => {
      User.find(query)
        .limit(_pageSize)
        .skip(_pageSize * (_pageNumber - 1))
        .then(response => {
          var totalPages = Math.ceil(totalCount / _pageSize);
          var response = {
            data: response,
            pages: totalPages,
            currentPage: _pageNumber,
            sizePerPage: _pageSize,
          };
          res.json(response);
        });
    });
  }
);

router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findByIdAndRemove(req.params.id).then(user => {
      res.json(user);
    });
  }
);

module.exports = router;
