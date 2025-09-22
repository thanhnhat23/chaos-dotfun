const { ServerManager } = require('./server');
const { ServerPlugin } = require('./theme/plugins/server-plugin');

const appServer = new ServerManager({
    projectRoot: __dirname,
    projectThemeName: 'default',
    jsSourceMaps: process.env.RELDENS_JS_SOURCEMAPS === '1',
    cssSourceMaps: process.env.RELDENS_CSS_SOURCEMAPS === '1',
    customPlugin: ServerPlugin
});

appServer.createServers().then(() => {
    return appServer.start();
}).catch((err) => {
    console.error('Server start error:', err);
    process.exit(1);
});
