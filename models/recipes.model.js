const fs = require("fs/promises");

const dataFile = `${process.cwd()}/data/data.json`;

const readDataFile = async (path) => {
  const fileContents = await fs.readFile(path);
  return JSON.parse(fileContents);
};

const writeDataFile = async (path, data) => {
  try {
    await fs.writeFile(path, data);
  } catch (err) {
    return "ERROR";
  }
};

exports.fetchRecipes = async (exclude_ingredients) => {
  const fileData = await readDataFile(dataFile);
  if (exclude_ingredients === undefined) {
    return fileData;
  } else {
    ingredientsToRemove = exclude_ingredients.split(",");
    let filteredData = fileData.map((recipe) => {
      let filteredIngredients = recipe.ingredients.filter((ing) => {
        return !ingredientsToRemove.includes(ing.name);
      });
      return { ...recipe, ingredients: filteredIngredients };
    });
    return filteredData;
  }
};

exports.fetchRecipeById = async (idFromAPI) => {
  const fileData = await readDataFile(dataFile);
  const singleRecipe = fileData.filter((recipe) => {
    return recipe.id.toLowerCase() === idFromAPI.toLowerCase();
  });
  return singleRecipe[0];
};

const findNextRecipeId = async () => {
  const recipes = await this.fetchRecipes();
  let idList = recipes.map((ele) => {
    return +ele.id.replace(/^.*-/, "");
  });
  idList.sort(function (a, b) {
    return a - b;
  });
  return "recipe-" + (1 + idList[idList.length - 1]);
};

exports.pushRecipe = async (imageUrl, instructions, ingredients) => {
  const id = await findNextRecipeId();
  const recipes = await this.fetchRecipes();
  const newRecipe = { id, imageUrl, instructions, ingredients };
  recipes.push(newRecipe);
  writeDataFile(dataFile, JSON.stringify(recipes));
  return newRecipe.id;
};
