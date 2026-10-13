import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

function keys(document, prefix = '') {
  assert.ok(document && typeof document === 'object' && !Array.isArray(document));
  return Object.entries(document).flatMap(([key, value]) => {
    assert.ok(!['__proto__', 'constructor', 'prototype'].includes(key));
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      assert.ok(value.trim().length > 0, `Empty translation: ${path}`);
      return [path];
    }
    return keys(value, path);
  }).sort();
}
const en = JSON.parse(await readFile(new URL('../translations/en.json', import.meta.url), 'utf8'));
const ru = JSON.parse(await readFile(new URL('../translations/ru.json', import.meta.url), 'utf8'));
assert.deepEqual(keys(en), keys(ru), 'Locale keys must match');
assert.equal(en.preserve.sentinel, 'Keep this unrelated key unchanged.');
assert.equal(ru.preserve.sentinel, 'Этот независимый ключ должен остаться без изменений.');
console.log('EN/RU translations and preservation sentinels validated.');
