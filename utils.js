/* eslint-disable semi */
const { floor, random } = Math;

function randomN(n = 100) {
  const randomFloat = random() * n;
  const randomInt = floor(randomFloat);
  return randomInt
}

function randomD(n = 6) {
  const min = 1;
  const randomFloat = random() * (n - min) + min;
  const randomInt = floor(randomFloat);
  return randomInt
}

function randomRolls(n = 2, s = 6) {
  const rolls = [];
  for (let i = 0; i < n; i += 1) {
    const rollValue = randomD(s);
    rolls.push(rollValue);
  }
  return rolls
}

module.exports.randomN = randomN
module.exports.randomD = randomD
module.exports.randomRolls = randomRolls
