function generatePassport() {
    const random_number = Math.floor(Math.random() * 10000);
    const result = `E0000${String(random_number).padStart(4, '0')}`;
    return result;
  }
  module.exports = { generatePassport };