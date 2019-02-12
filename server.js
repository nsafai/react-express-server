/* eslint-disable semi */
const express = require('express')
const bodyParser = require('body-parser')

const { randomN, randomD, randomRolls } = require('./utils')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ** Proxy from React can't get at '/' for some reason?
// Apparently this is expected behavior... **
// Test this route with: localhost:4000/
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

// A simple route that returns a JSON object
// Test this route with:
app.get('/about', (req, res) => {
  // This Object is converted to JSON and returned.
  res.json({ about: 'This service generates a random numbers.' })
})

// Random number route
// Test this route with: http://localhost:4000/random?n=99
// Where n=99 sets the range of the random number returned
app.get('/random', (req, res) => {
  // console.log(req.query);
  const { n } = req.query;
  const value = randomN(n);
  res.json({ value })
})

app.get('/random/die', (req, res) => {
  const { n } = req.query;
  const value = randomD(n);
  res.json({
    value,
    message: `you got a random number betwen 0 and ${n}. Specify a different max by appending ?n=MAX to your request.`,
  });
})

app.get('/random/dice', (req, res) => {
  const { n, s } = req.query;
  const values = randomRolls(n, s);
  let total = 0;

  for (let i = 0; i < values.length; i += 1) {
    total += values[i];
  }

  res.json({
    values,
    total,
    message: `you rolled ${n} dice with ${s} sides. You can change these parameters with ?n=NUMBEROFDICE and ?s=NUMBEROFSIDES to your request.`,
  });
})

const port = 4000
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`))
