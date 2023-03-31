const cds = require('@sap/cds');

cds.on('bootstrap', async (app) => {
    app.get('/healthz', (_, res) => { res.status(200).send('OK') })
    app.use(require("express").json({ limit: '50MB' }))
});

module.exports = cds.server;

