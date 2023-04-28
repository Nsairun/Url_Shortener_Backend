const SALT_ROUNDS = +process.env.SALT_ROUNDS;
const JWT_PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = { SALT_ROUNDS, JWT_PRIVATE_KEY };
