module.exports = {

    home: function(request, reply) {
        reply.file('./public/views/index.html');
    },

    api: function(request, reply) {
        console.log("we are in api");
        reply("we are in api");
    }

};
