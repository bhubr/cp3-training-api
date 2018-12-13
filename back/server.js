const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


app.listen(6000, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Listening on port 6000');
  }
});
