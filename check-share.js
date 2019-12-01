const storage = require('node-persist');

(async () => {
  await storage.init( );
  await storage.setItem('us','2019-12-01T05:54:48.7887936Z0');
  await storage.setItem('ous','2019-12-01T05:54:48.7887936Z0');
})();
