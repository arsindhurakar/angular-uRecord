require('./config/passportConfig');

const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./models/db');
const cors = require('cors');
const passport = require('passport');
// const bodyParser = require('body-parser');

dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT;
const rtsIndex = require('./routes/index.router');

const app = express();
connectDB();

//middleware
// app.use(bodyParser.json()); -> depricated
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

//error handler
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    let valErrors = [];
    Object.keys(err.errors).forEach((key) =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  }
});

app.get('/', (req, res) => {
  res.send('Server');
});

app.use('/api/', rtsIndex);

app.post('/enroll', (req, res) => {
  // console.log(req.body);
  res.status(200).send(req.body);
});

//start server
app.listen(PORT, () => {
  console.log('listening on port', +PORT);
});
