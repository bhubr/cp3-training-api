const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const handleSQLError = require('./handleSQLError');

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

app.get('/api/playlists/:id', (req, res) => {
  db.query('SELECT * FROM playlist WHERE id = ?', [req.params.id], (err, results) => {
    if (err) {
      return handleSQLError(err, res);
    }
    if (!results.length) {
      return res.status(404).json({
        error: `Playlist ${req.params.id} not found`
      });
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

app.listen(6000, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Listening on port 6000');
  }
});
