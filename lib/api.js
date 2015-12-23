var client = require("./db.js");

module.exports = {

    addNewRecipe: function(recipeData, callback) {
        var recipeId = (Math.random() + 1).toString(36).substring(7);

        // adding id and timestamp to recipe object
        recipeData.id = recipeId;
        recipeData.added = Date.now();

        // adding recipe to set in database listing all recipes
        client.sadd("recipes", recipeId, recipeData.title, function(err, response) {
            if (err) {
                callback(err, null);
            } else {
                
                // adding recipe to database as a hash
                client.hmset(recipeId, recipeData, function(err, response) {
                    if(err) {
                        callback(err, null);
                    } else {
                        callback(null, true);
                    }
                });
            }
        });

    },

    getRecipeData: function(recipeId, callback) {

        // getting recipe data
        client.hgetall(recipeId, function(err, response) {
            if (err) {
                callback(err, null);
            } else if (response === null) {
                callback(null, false);
            } else {
                callback(null, response);
            }
        });
    }

};
