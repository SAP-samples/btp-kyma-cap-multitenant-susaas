const cds = require('@sap/cds');
const odatav2adapterproxy = require('@sap/cds-odata-v2-adapter-proxy');

cds.on('bootstrap', async (app) => {
    
    app.get('/healthz', (_, res) => {
        res.status(200).send('OK')
    });

    app.use(odatav2adapterproxy());
});

module.exports = cds.server;