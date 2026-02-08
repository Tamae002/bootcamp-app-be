// src/scripts/generate-hash.mjs
import bcrypt from 'bcrypt';

const password = '123456'; // ganti dengan password Anda
const saltRounds = 10;

try {
  const hash = await bcrypt.hash(password, saltRounds);
  console.log('✅ Hash generated:');
  console.log(hash);
} catch (err) {
  console.error('❌ Error generating hash:', err);
}