// Custom start.js file used to dynamically read broker user and password from environment variables

const Broker = require('@sap/sbf');

let broker = new Broker({
    "brokerCredentials": {
        [process.env["BROKER_USER"]] : process.env["BROKER_PASSWORD"]
    }
});

broker.start();