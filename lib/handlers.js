var api = require("./api.js");

module.exports = {

    home: function(request, reply) {
        reply.file('./public/views/index.html');
    },

    add: function(request, reply) {
        reply.file('./public/views/add-recipe.html');
    },

    recipe: function(request, reply) {
        var url = request.path;

        if (url.split('/')[3] === "update") {
            reply.file('./public/views/update-recipe.html');
        } else {
            reply.file('./public/views/recipe.html');
        }
    },

    api: function(request, reply) {
        var url = request.path;

        if (url.split('/')[2] === "recipe") {

            // adding a recipe
            if (url.split('/')[3] === "add") {
                var recipeData = request.payload;

                api.addNewRecipe(recipeData, function(err, added) {
                    if (err) {
						reply("there was an error adding the recipe");
					} else {
						reply.redirect("/");
					}
                });


            } else if (url.split('/')[3] === "get") {

                // getting data for one recipe
                if (url.split('/')[4] !== "all") {
                    var recipeId = url.split('/')[4];

                    api.getRecipeData(recipeId, function(err, recipeData) {
                        if (err || recipeData === false) {
                            reply("there was an error getting the recipe data");
                        } else {
                            reply(recipeData);
                        }
                    });

                // getting data for all recipes
                } else {
                    api.getAllRecipes(function(err, recipeData) {
                        reply(recipeData);
                    });

                }

            } else if (url.split('/')[3] === "update") {
                var recipeId = request.info.referrer.split('/')[4];
                var recipeData = request.payload;
                var recipeUrl = request.info.referrer.split('/').slice(0, -1).join('/');

                api.updateRecipe(recipeId, recipeData, function(err, response) {
                    console.log(response);
                    reply.redirect(recipeUrl)
                });
            }

        }

    }

};
