//This uses CommonJS module pattern to export a single module function.
//This function takes an express object as argument 

//Load the 'index' controller
var index = require('../controllers/index.server.controller');
var aigames = require('../controllers/aigames.server.controller');

//
//handle routing for get and post request
module.exports = function (app) {
    //handle a get request made to root path
    app.get('/', index.render); //go to http://localhost:5000/

    app.post('/api/train', aigames.train);
    app.get('/api/predict', aigames.predict);
    
};
