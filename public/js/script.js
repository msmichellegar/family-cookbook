// if this is the homepage
if (window.location.pathname === "/") {

    // get all recipes
    $.ajax('/api/recipe/get/all', {
        success: function(recipesData) {
            // display recipes
            displayRecipesGallery(recipesData);
        }
    });

}

// if this is a recipe page
if (window.location.pathname.split('/')[1] === "recipe") {
    var recipeId = window.location.pathname.split('/')[2];

    // get recipe data
    $.ajax('/api/recipe/get/' + recipeId, {
        success: function(recipeData) {
            // display recipe
            displayRecipe(recipeData);
        }
    });

}

function displayRecipesGallery (recipes) {
    for (var i=0; i < recipes.length; i++) {
        var recipeImage;
        var galleryItem;

        if (recipes[i].image) {
            recipeImage = recipes[i].image;
        } else {
            recipeImage = "/static/public/images/donuts.png";
        }

        galleryItem = "<a href='/recipe/"+ recipes[i].id + "'><div class='recipe-block'><p>" + recipes[i].title + "</p></div></a>";

        $("#recipes-gallery").append(galleryItem);
    }
}

function displayRecipe (recipeData) {
    var recipeContent = "<div><h1>" + recipeData.title + "</h1><p>" + recipeData.author + "</p><img src='" + recipeData.image + "'><p>" + recipeData.background + "</p><p>" + recipeData.time + "</p><p>" + recipeData.ingredients + "</p><p>" + recipeData.directions + "</p></div>";
    $("#recipe-content").append(recipeContent);
}
