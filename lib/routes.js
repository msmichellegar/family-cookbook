var handlers = require('./handlers.js');

module.exports = [

    {
        method: 'GET',
        path: '/',
        handler: handlers.home
    },

    {
        method: 'GET',
        path: '/add',
        handler: handlers.add
    },

    {
        method: ['GET', 'POST'],
        path: '/api/{path*}',
        handler: handlers.api
    },

    {
        method: 'GET',
        path: '/static/{path*}',
        handler:  {
            directory: {
                path: './'
            }
        }
    }

];
