const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser  = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use('/login', (req, res) => {
    console.log('\n New login Request ', req.body);
    if (req.body?.username === 'avi' && req.body?.password === '1234') {
      console.log('sending 200 response');
      res.send({
        token: 'adamson'
      });
    } else {
      console.log('sending 401 response');
      res.send(401);
    }
  });

  app.use('/verify', (req, res) => {
    console.log('\n New verify Request ', req.body);
    if (req.body?.token === 'adamson') {
      console.log('sending 200 response');
      res.send(200);
    } else {
      console.log('sending 401 response');
      res.send(401);
    }
  });


app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));