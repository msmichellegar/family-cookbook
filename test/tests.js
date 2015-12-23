var test = require("tape");
var client = require('../lib/db.js');
var server = require('../server.js');

test("homepage is displayed at '/'", function (t) {
    server.inject({method: 'GET', url: '/'}, function (res) {
        t.equal(res.statusCode, 200, 'homepage found');
        t.end();
    });
});

test("database is running", function (t) {
    client.set('test', 'testData');
    client.get('test', function (err, reply) {
        t.equal(reply, 'testData', 'database is running');
        client.del('test');
        t.end();
    });
});
