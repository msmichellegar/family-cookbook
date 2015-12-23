var client = require("./db.js");

module.exports = {

    addNewRecipe: function(recipeData, callback) {
        var recipeId = (Math.random() + 1).toString(36).substring(7);

        // adding id and timestamp to recipe object
        recipeData.id = recipeId;
        recipeData.added = Date.now();

        // adding recipe to database
        client.hmset(recipeId, recipeData, function(err, response) {
            if(err){
                callback(err, null);
            } else {
                callback(null, true);
            }
        });
    }

};
