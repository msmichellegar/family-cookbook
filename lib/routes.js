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
        method: 'GET',
        path: '/recipe/{path*}',
        handler: handlers.recipe
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
