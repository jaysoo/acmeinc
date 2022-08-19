const cache = require('@actions/cache');

async function run() {
  const paths = ['coverage/'];
  console.log('>>> restoring...');
  const key = 'coverage';

  const restoreKeys = ['coverage'];
  const cacheKey = await cache.restoreCache(paths, key, restoreKeys);
  console.log('>>> cacheKey', cacheKey);
}

run();
