export const pageSize = 10
export const URLS = {
  INGREDIENT_LIST: "/api/ingredient/",
  INGREDIENT_ADD: "/api/ingredient/",
  INGREDIENT_DETAIL: "/api/ingredient/:id/",
  INGREDIENT_UPDATE: "/api/ingredient/:id/",
  INGREDIENT_PATCH: "/api/ingredient/:id/",
  INGREDIENT_DELETE: "/api/ingredient/:id/",
  RECIPE_LIST: "/api/recipe/?limit=:limit&offset=:offset",
  RECIPE_ADD: "/api/recipe/",
  RECIPE_DETAIL: "/api/recipe/:id",
  RECIPE_UPDATE: "/api/recipe/:id/",
  RECIPE_PATCH: "/api/recipe/:id/",
  RECIPE_DELETE: "/api/recipe/:id/",
};

export const PATHS = {
  HOME: "/",
  RECIPE_LIST: "/recipes/:page",
  RECIPE_VIEW: "/recipe/:id",
  RECIPE_ADD: "/recipes/add",
};
