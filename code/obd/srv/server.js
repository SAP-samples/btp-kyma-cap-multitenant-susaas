const cds = require('@sap/cds');
const odatav2adapterproxy = require('@sap/cds-odata-v2-adapter-proxy');
const cookieParser = require('cookie-parser');

cds.on('bootstrap', async (app) => {

    app.use(cookieParser());
    
    app.get('/healthz', (_, res) => {
        res.status(200).send('OK')
    });

    app.use(odatav2adapterproxy());
});

module.exports = cds.server;