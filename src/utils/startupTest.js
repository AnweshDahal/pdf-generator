const fs = require('fs');
const path = require('path');

const check = () => {
  // Load .env file
  const envPath = path.join(__dirname, '../../.env');
  const schemaPath = path.join(__dirname, '../../env.schema.json');

  const envFile = fs.readFileSync(envPath, 'utf8');
  const schemaFile = fs.readFileSync(schemaPath, 'utf8');

  // Parse .env into key-value pairs
  const envKeys = envFile
    .split('\n')
    .map((line) => line.split('=')[0].trim())
    .filter((key) => key && !key.startsWith('#'));

  // Parse JSON schema
  const schemaKeys = JSON.parse(schemaFile).keys.map((entry) => entry.key);

  // Find missing and extra keys
  const missingKeys = schemaKeys.filter((key) => !envKeys.includes(key));
  const extraKeys = envKeys.filter((key) => !schemaKeys.includes(key));

  if (missingKeys.length > 0) {
    console.log('Missing keys in .env:', missingKeys);
  } else {
    console.log('No missing keys ✅');
  }

  if (extraKeys.length > 0) {
    console.log('Extra keys in .env:', extraKeys);
  } else {
    console.log('No extra keys ✅');
  }
};

module.exports = () => {
  console.log('👩‍⚕️ PDF Generation: Health Check');

  // check if headless chrome is installed

  // check env values
  check();
};
