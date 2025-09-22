const { ConfigManager } = require('./lib/config/server/manager');
const { EventsManagerSingleton, sc } = require('@reldens/utils');
const { StorageEngine } = require('./lib/storage/server/storage-engine');

(async () => {
  const configManager = new ConfigManager({ events: EventsManagerSingleton, customClasses: {} });
  const storage = new StorageEngine({
    driver: 'objection-js',
    database: {
      client: process.env.RELDENS_DB_CLIENT || 'mysql2',
      config: {
        host: process.env.RELDENS_DB_HOST,
        port: Number(process.env.RELDENS_DB_PORT),
        database: process.env.RELDENS_DB_NAME,
        user: process.env.RELDENS_DB_USER,
        password: process.env.RELDENS_DB_PASSWORD,
        multipleStatements: true
      },
      debug: false
    }
  });
  await storage.connect();
  configManager.dataServer = storage;
  await configManager.loadConfigurations();
  console.log('version', configManager.getWithoutLogs('client/gameEngine/version', 'none'));
  await storage.disconnect();
})();
