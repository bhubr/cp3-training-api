const express = require('express');
const db = require('../db');
const { handleSQLError, handleNotFound } = require('../handleErrors');
const tracksRouter = require('./tracks');

const router = express.Router();

// Routeur imbrique
// https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router
router.use('/:playlistId', tracksRouter);

router.post('/', (req, res) => {
  db.query('INSERT INTO playlist SET ?', req.body, (err, results) => {
    if (err) {
      return handleSQLError(err, res);
    }
    res.status(200).end();
  });
});

const queryToWhereKeys = query => Object.keys(query)
  .map(key => `${key} LIKE ?`).join(' AND ');

router.get('/', (req, res) => {
  // { genre: 'Rock', title: 'Divers' }
  // WHERE genre='Rock' AND title='Divers'
  const criteria = queryToWhereKeys(req.query);
  const where = criteria ? ` WHERE ${criteria}` : '';
  const values = Object.values(req.query).map(val => `%${val}%`);
  db.query(`SELECT * FROM playlist ${where}`, values, (err, results) => {
    if (err) {
      return handleSQLError(err, res);
    }
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  db.query('SELECT * FROM playlist WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      return handleSQLError(err, res);
    }
    if (!results.length) {
      return handleNotFound(`Playlist ${req.params.id} not found`, res);
    }
    res.json(results[0]);
  });
});

module.exports = router;