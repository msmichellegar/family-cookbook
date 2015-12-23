var api = require("./api.js");

module.exports = {

    home: function(request, reply) {
        reply.file('./public/views/index.html');
    },

    add: function(request, reply) {
        reply.file('./public/views/add-recipe.html');
    },

    api: function(request, reply) {
        var url = request.path;

        if (url.split('/')[2] === "recipe") {

            // adding a recipe
            if (url.split('/')[3] === "add") {
                var recipeData = request.payload;
                api.addNewRecipe(recipeData, function(err, added) {
                    if(err){
						reply("there was an error adding the recipe");
					} else {
						reply("success!");
					}
                });

            // displaying a recipe
            } else {
                console.log("recipe will appear here");
                reply("recipe will appear here");
            }
        }

    }

};
