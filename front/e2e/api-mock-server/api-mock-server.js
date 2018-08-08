const express   = require('express');
const path      = require('path');
const ngApimock = require('ng-apimock')();
const app       = express();

const port = 9001;

// register api calls mocks
ngApimock.run({
    "src"      : "e2e/api-mock-server/mocks",
    "outputDir": "e2e/api-mock-server/interface",
});

// process api calls through ng-apimock
app.use(require('ng-apimock/lib/utils').ngApimockRequest);

// start server
app.listen(port, function ()
{
    console.log('app running on port', port);
});