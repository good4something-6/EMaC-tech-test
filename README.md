# README - Lizzo’s Juicy Juice Bar - The Server

## Prerequisites

- Node
- npm

## Getting Started

Before attempting anything, ensure you have run `npm i` in this directory to install all dependencies.

## Testing

All tests are in the `test` directory. We use `jest` and `supertest` to test our server. Run `npm t` to execute tests.

Prior to testing the file ./data/data.json needs to be replaced with a copy of the file ./data/VANILLA-data.json  
This 'initializes' the data available for the tests.  
This can be achieved by running the following bash commands from the project folder.

```
rm ./data/data.json
cp ./data/VANILLA-data.json ./data/data.json

```

## Running Dev Server

Run `npm run dev` to run the development server. It is configured to run on localhost:9090 by default.

## Endpoints

- `/api`

  - GET - Returns status 200 and an `ok` message when the server is online
  -

- `api/recipes`

  - GET - Returns status 200 and a full list of recipes
  -
  - POST - Providing a recipe JSON object adds the recipe to the data
  -

- `api/recipes?exclude_ingredients=ingredientsString`

  "ingredientsString" is of the form "item1,item2,..." -- Example: "exclude_ingredients=flax,oat%20milk"

  - GET - Returns status 200 and a list of recipes but with the specified items removed from the ingredients of each recipe
  -

- `api/recipes/:id`

  ":id" is a valid recipe ID

  - GET - Returns status 200 and a an object containing the specified recipe
