const express = require('express');

const router = express.Router({mergeParams: true});
const db = require('../db');
const { handleSQLError, handleNotFound } = require('../handleErrors');

router.post('/tracks', (req, res) => {
  const trackData = {
    ...req.body,
    playlist_id: req.params.playlistId
  };
  db.query('INSERT INTO track SET ?', trackData, (err, results) => {
    if (err) {
      return handleSQLError(err, res);
    }
    res.status(200).end();
  });
});

router.get('/tracks', (req, res) => {
  db.query('SELECT * FROM playlist WHERE id = ?', [req.params.playlistId], (err, results) => {
    if (err) {
      return handleSQLError(err, res);
    }
    if (!results.length) {
      return res.status(404).json({
        error: `Playlist ${req.params.id} not found`
      });
    }
    
    db.query(
      'SELECT * FROM track WHERE playlist_id = ?', [req.params.playlistId],
      (err, results) => {
        if (err) {
          return handleSQLError(err, res);
        }
        res.json(results);
      });
  });
});

router.delete('/tracks/:trackId', (req, res) => {
  const { playlistId, trackId } = req.params;
  db.query('DELETE FROM track WHERE playlist_id = ? AND id = ?', [playlistId, trackId], (err, results) => {
    if (err) {
      return handleSQLError(err, res);
    }
    if (results.affectedRows === 0) {
      return handleNotFound(`Track ${trackId} not found on playlist ${playlistId}`, res);
    }
    res.status(204).end();
  });
});

router.put('/tracks/:trackId', (req, res) => {
  const { playlistId, trackId } = req.params;
  db.query('UPDATE track SET ? WHERE playlist_id = ? AND id = ?', [req.body, playlistId, trackId], (err, results) => {
    if (err) {
      return handleSQLError(err, res);
    }
    if (results.affectedRows === 0) {
      return handleNotFound(`Track ${trackId} not found on playlist ${playlistId}`, res);
    }
    db.query('SELECT * FROM track WHERE playlist_id = ? AND id = ?', [playlistId, trackId], (err, results) => {
      return res.json(results[0]);
    });
  });
});

module.exports = router;