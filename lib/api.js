var client = require("./db.js");

module.exports = {

    addNewRecipe: function(recipeData, callback) {
        var recipeId = (Math.random() + 1).toString(36).substring(7);

        // adding id and timestamp to recipe object
        recipeData.id = recipeId;
        recipeData.added = Date.now();

        // maintaining paragraphing and spaces
        recipeData.ingredients = recipeData.ingredients.replace(/\r\n/g, '<br>');
        recipeData.background = recipeData.background.replace(/\r\n/g, '<br>');
        recipeData.directions = recipeData.directions.replace(/\r\n/g, '<br>');

        // adding recipe to set in database listing all recipes
        client.sadd("recipes", recipeId, recipeData.title, function(err, res) {
            if (err) {
                callback(err, null);
            } else {

                // adding recipe to database as a hash
                client.hmset(recipeId, recipeData, function(error, response) {
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
    },

    updateRecipe: function(recipeId, recipeData, callback) {
        console.log(recipeData);

        // updating timestamp
        recipeData.added = Date.now();

        // maintaining paragraphing and spaces
        recipeData.ingredients = recipeData.ingredients.replace(/\r\n/g, '<br>');
        recipeData.background = recipeData.background.replace(/\r\n/g, '<br>');
        recipeData.directions = recipeData.directions.replace(/\r\n/g, '<br>');

        // adding recipe to database as a hash
        client.hmset(recipeId, recipeData, function(error, response) {
            if(error) {
                callback(error, null);
            } else {
                console.log(response)
                callback(null, true);
            }
        });
    },

    getAllRecipes: function(callback) {

        // getting ids of all recipes
        client.smembers("recipes", function(err, recipeIds) {
            if (err) {
                callback(err, null);
            } else if (recipeIds === null) {
                callback(null, false);
            } else {
                var recipes = [];
                var counter = 0;

                // getting recipe data for each id
                recipeIds.forEach(function(e) {
                    return client.hgetall(e, function(error, recipeData) {

                        if (recipeData !== null) {
                            recipes.push(recipeData);
                        }

                        if(++counter === recipeIds.length) {
                            callback(null, recipes);
                        }
                    });
                });
            }
        });
    }

};
