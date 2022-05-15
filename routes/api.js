const apiRouter = require("express").Router();

const {
  getRecipes,
  getRecipeByID,
  postRecipe,
} = require("../controllers/recipes.controller");

apiRouter.post("/recipes", postRecipe);

apiRouter.get("/recipes/:id", getRecipeByID);
apiRouter.get("/recipes", getRecipes);

apiRouter.get("/", (_, res) => {
  res.json({ message: "ok" });
});

apiRouter.all("/*", (_, res) => {
  res.status(404).send({ msg: "404 - Invalid end point" });
});

module.exports = apiRouter;
