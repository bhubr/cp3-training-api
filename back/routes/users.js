const express = require('express');
const db = require('../db');
const { handleSQLError, handleNotFound } = require('../handleErrors');

const router = express.Router();

router.post('/', (req, res) => {
  db.query('INSERT INTO user SET ?', req.body, (err, results) => {
    if (err) {
      return handleSQLError(err, res);
    }
    res.status(200).end();
  });
});

router.put('/:user_id/playlists', (req, res) => {
  const { user_id } = req.params;
  const { playlist_id } = req.body;
  db.query('INSERT INTO user_playlist SET ?', {
    user_id, playlist_id
  }, (err, results) => {
    if (err) {
      return handleSQLError(err, res);
    }
    res.status(200).end();
  });
});

router.delete('/:user_id/playlists', (req, res) => {
  const { user_id: userId } = req.params;
  const { playlist_id: playlistId } = req.query;
  db.query('DELETE FROM user_playlist WHERE user_id = ? AND playlist_id = ?',
    [userId, playlistId], (err, results) => {
      if (err) {
        return handleSQLError(err, res);
      }
      res.status(200).end();
    });
});

module.exports = router;
