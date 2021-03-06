const express = require('express');
const bodyParser = require('body-parser');
const playlistRouter = require('./routes/playlists');
const userRouter = require('./routes/users');

const app = express();
app.use(bodyParser.json());

app.use('/api/playlists', playlistRouter);
app.use('/api/users', userRouter);

app.listen(6000, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Listening on port 6000');
  }
});
