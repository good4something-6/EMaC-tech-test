const supertest = require("supertest");
const server = require("../server");

const request = supertest(server);

const recipe59 = {
  id: "recipe-59",
  imageUrl: "http://www.images.com/18",
  instructions:
    "60 seconds on the highest setting your blender has, or until a smooth paste has formed",
  ingredients: [
    {
      name: "demerara sugar",
      grams: 25,
    },
    {
      name: "flax",
      grams: 66,
    },
    {
      name: "apple juice",
      grams: 44,
    },
    {
      name: "oat milk",
      grams: 198,
    },
  ],
};
describe("Test API connectivity", () => {
  test("/api", async () => {
    const { body } = await request.get("/api").expect(200);
    expect(body.message).toBe("ok");
  });
});

describe("Get Recipes With Filter", () => {
  test("200: get api/recipes responds with an array of objects", async () => {
    const { body } = await request.get("/api/recipes").expect(200);
    expect(Array.isArray(body.recipes)).toBe(true);
    body.recipes.forEach((ele) => {
      expect(typeof ele).toBe("object");
    });
  });

  test("200: get api/recipes responds with an array of 100 objects", async () => {
    const { body } = await request.get("/api/recipes").expect(200);
    expect(body.recipes.length).toEqual(100);
  });

  test("200: get api/recipes with filter removes the ingredient from the recipes", async () => {
    const { body } = await request
      .get("/api/recipes?exclude_ingredients=flax,oat%20milk")
      .expect(200);

    let checkIngredients = [
      { name: "demerara sugar", grams: 25 },
      { name: "apple juice", grams: 44 },
    ];

    let recipeDataToCheck = body.recipes.filter((ele) => {
      return ele.id === "recipe-59";
    })[0];

    expect(recipeDataToCheck.ingredients).toEqual(checkIngredients);
  });
});

describe("Get Recipe By ID", () => {
  test("200: get api/recipes/recipe-59 responds with the single recipe", async () => {
    const { body } = await request.get("/api/recipes/recipe-59").expect(200);
    expect(body.recipe).toEqual(recipe59);
  });
  test("404: invalid recipe ID - get api/recipes/recipe-599 responds with Recipe not found", async () => {
    const { body } = await request.get("/api/recipes/recipe-599").expect(404);
    expect(body.msg).toBe("Recipe ID not found");
  });
});

describe("Post Recipe", () => {
  newRecipe = {
    imageUrl: "http://test.png",
    instructions: "Steps",
    ingredients: [{ name: "Water", grams: 1000 }],
  };
  test("201: post api/recipes returns status 201", async () => {
    const { body } = await request
      .post("/api/recipes")
      .send(newRecipe)
      .expect(201);
  });
  test("201: post api/recipes returns the new recipe ID", async () => {
    const { body } = await request
      .post("/api/recipes")
      .send(newRecipe)
      .expect(201);
    expect(body.recipeID).toBe("recipe-101");
  });
  test.skip("201: TEST INCOMPLETE check after post api/recipes correct data can be retrieved from file", async () => {
    const { body } = await request
      .post("/api/recipes")
      .send(newRecipe)
      .expect(201);
    expect("TEST NOT CONSTRUCTED YET").toBe("NOT YET");
  });
});
