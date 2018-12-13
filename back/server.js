const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const { handleSQLError, handleNotFound } = require('./handleErrors');

const app = express();
app.use(bodyParser.json());

// CRUD = Create, Read (2 routes), Update, Delete

app.post('/api/playlists', (req, res) => {
  db.query('INSERT INTO playlist SET ?', req.body, (err, results) => {
    if (err) {
      return handleSQLError(err, res);
    }
    res.status(200).end();
  });
});

const queryToWhereKeys = query => Object.keys(query)
  .map(key => `${key} LIKE ?`).join(' AND ');

app.get('/api/playlists', (req, res) => {
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

app.get('/api/playlists/:id', (req, res) => {
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

app.post('/api/playlists/:id/tracks', (req, res) => {
  const trackData = {
    ...req.body,
    playlist_id: req.params.id
  };
  db.query('INSERT INTO track SET ?', trackData, (err, results) => {
    if (err) {
      return handleSQLError(err, res);
    }
    res.status(200).end();
  });
});

app.get('/api/playlists/:id/tracks', (req, res) => {
  db.query('SELECT * FROM playlist WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      return handleSQLError(err, res);
    }
    if (!results.length) {
      return res.status(404).json({
        error: `Playlist ${req.params.id} not found`
      });
    }
    
    db.query(
      'SELECT * FROM track WHERE playlist_id = ?', [req.params.id],
      (err, results) => {
        if (err) {
          return handleSQLError(err, res);
        }
        res.json(results);
      });
  });
});

app.delete('/api/playlists/:playlistId/tracks/:trackId', (req, res) => {
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

app.put('/api/playlists/:playlistId/tracks/:trackId', (req, res) => {
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

app.listen(6000, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Listening on port 6000');
  }
});
