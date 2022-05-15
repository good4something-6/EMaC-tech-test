const {
  fetchRecipes,
  fetchRecipeById,
  pushRecipe,
} = require("../models/recipes.model");

exports.getRecipes = (req, res, next) => {
  const { exclude_ingredients } = req.query;
  fetchRecipes(exclude_ingredients)
    .then((recipeData) => {
      res.statusCode = 200;
      res.send({ recipes: recipeData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getRecipeByID = (req, res, next) => {
  const { id } = req.params;
  fetchRecipeById(id)
    .then((recipe) => {
      if (recipe !== undefined) {
        res.statusCode = 200;
        res.send({ recipe });
      } else {
        res.statusCode = 404;
        res.send({ msg: "Recipe ID not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.postRecipe = (req, res, next) => {
  const { imageUrl, instructions, ingredients } = req.body;
  pushRecipe(imageUrl, instructions, ingredients)
    .then((result) => {
      res.statusCode = 201;
      res.send({ recipeID: result });
    })
    .catch((err) => {
      next(err);
    });
};
