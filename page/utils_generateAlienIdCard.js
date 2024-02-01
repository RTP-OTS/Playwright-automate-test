function generateAlienIdCard() {
    const randomNumber = Math.floor(Math.random() * (999999999999 - 100000000000 + 1)) + 100000000000;
    const result = String(randomNumber).substring(1, 13);
    return result;
  }
  module.exports = { generateAlienIdCard };