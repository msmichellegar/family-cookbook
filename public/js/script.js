// if this is the homepage
if (window.location.pathname === "/") {

    // get all recipes
    $.ajax('/api/recipe/get/all', {
        success: function(recipesData) {
            displayRecipesGallery(recipesData);
        }
    });

    // display recipes
    function displayRecipesGallery (recipes) {
        $("#recipes-gallery").append(recipes);
    }

}
