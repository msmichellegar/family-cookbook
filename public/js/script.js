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


if (window.location.pathname.split('/')[3] === "update") {
    var recipeId = window.location.pathname.split('/')[2];

    // get recipe data
    $.ajax('/api/recipe/get/' + recipeId, {
        success: function(recipeData) {
            // fill form with recipe data
            fillUpdateForm(recipeData);
        }
    });

}

function displayRecipesGallery (recipes) {

    $("#loading-gif").remove();

    for (var i=0; i < recipes.length; i++) {
        var recipeImage;
        var galleryItem;

        if (determineIfRecipeHasValidImage(recipes[i]) !== false) {
            recipeImage = recipes[i].image;
        } else {
            recipeImage = "/static/public/images/donuts.png";
        }

        galleryItem = "<a href='/recipe/"+ recipes[i].id + "'><div class='recipe-block'><img src='"+ recipeImage +"'><p>" + recipes[i].title + "</p><hr></hr><h4>By " + recipes[i].author +"</h4></div></a>";

        $("#recipes-gallery").append(galleryItem);
    }
}

function determineIfRecipeHasValidImage (recipeData) {
    if (recipeData.image && ((recipeData.image).indexOf("jpg") !== -1 || (recipeData.image).indexOf("png") !== -1)) {
        return true;
    } else {
        return false;
    }
}

function displayRecipe (recipeData) {
    var recipeImage;
    var recipeContent;

    if (determineIfRecipeHasValidImage(recipeData) !== false) {
        recipeImage = recipeData.image;
    } else {
        recipeImage = "/static/public/images/donuts.png";
    }

    recipeContent = "<div class='recipe'><div class='title'><div><h2>" + recipeData.title + "</h2><h4>Author: " + recipeData.author + " | Cooking time: " + recipeData.time + "</h4></div><div class='button'><a href='/recipe/" + recipeData.id + "/update'><button><i>Edit Recipe</i></button></a></div></div><div class='content-row-one'><img class='image' src='" + recipeImage + "'><div class='background' style='display: none;'><h2>Background</h2><p>" + recipeData.background + "</p></div></div><div class='directions'><h2>Ingredients</h2><p class='ingredients'>" + recipeData.ingredients + "</p><h2>Directions</h2><p>" + recipeData.directions + "</p></div></div>";

    $("#recipe-content").append(recipeContent);

    hideOrDisplayBackground(recipeData);
}

function fillUpdateForm (recipeData) {

    $("#title").val(recipeData.title);
    $("#author").val(recipeData.author);
    $("#background").val(recipeData.background);
    $("#ingredients").val(recipeData.ingredients);
    $("#time").val(recipeData.time);
    $("#directions").val(recipeData.directions);
    $("#image").val(recipeData.image);

}

function hideOrDisplayBackground (recipeData) {

    if (recipeData.background) {
        $('.image').css('width', '60%');
        $('.background').css('display', 'block');
    }
}
