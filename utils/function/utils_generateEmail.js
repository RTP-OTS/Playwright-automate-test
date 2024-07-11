function generateRandomEmail() {
  const randomSuffix = Math.random().toString(36).substring(7);
  return `automated${randomSuffix}@gmail.com`;
}

module.exports = { generateRandomEmail };