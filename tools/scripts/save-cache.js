const cache = require('@actions/cache');

async function run() {
  console.log('>>> ACTIONS_CACHE_URL', process.env.ACTIONS_CACHE_URL);
  const paths = ['coverage/'];
  console.log('>>> caching...');
  const key = 'coverage';
  const cacheId = await cache.saveCache(paths, key);
  console.log('>>> cacheId', cacheId);
}

run();
