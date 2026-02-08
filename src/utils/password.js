import { hash, compare } from 'bcrypt';

async function hashPassword(plain) {
  const saltRounds = 10;
  return hash(plain, saltRounds);
}

async function comparePassword(plain, hashed) {
  return compare(plain, hashed);
}

export {
  hashPassword,
  comparePassword,
};