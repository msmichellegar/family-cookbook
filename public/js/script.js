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

function displayRecipesGallery (recipes) {
    for (var i=0; i < recipes.length; i++) {
        var galleryItem = "<div><p>" + recipes[i].title + "</p></div>";
        $("#recipes-gallery").append(galleryItem);
    }
}
