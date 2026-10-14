import assert from 'node:assert/strict';

// Inputs are data. Never interpolate them into shell commands or execute them.
assert.match(process.env.LINGVA_REQUEST_ID ?? '', /^[a-f0-9]{64}$/u, 'Invalid operation correlation ID');
for (const name of ['LINGVA_PROJECT_ID', 'LINGVA_ENVIRONMENT_ID']) {
  assert.match(process.env[name] ?? '', /^[a-z0-9][a-z0-9_-]{2,63}$/u, `Invalid synthetic identifier: ${name}`);
}
console.log(`Validated Lingva operation ${process.env.LINGVA_REQUEST_ID}`);
