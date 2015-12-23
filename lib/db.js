var url = require('url');
var redis = require('redis');
var client = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});

client.on('error', function(err) {
    console.log('Redis error: ' + err);
});

module.exports = client;
