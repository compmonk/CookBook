import {pageSize, URLS} from "../constants";

import api from "./api";

export const getRecipes = async (page) => {
  try {
    const { data } = await api.get(
      URLS.RECIPE_LIST.replace(":limit", pageSize).replace(
        ":offset",
        (page - 1) * pageSize,
      ),
    );
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getRecipe = async (id) => {
  try {
    const { data } = await api.get(URLS.RECIPE_DETAIL.replace(":id", id));
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const addRecipe = async (recipe) => {
  try {
    const { data } = await api.post(URLS.RECIPE_ADD, recipe);
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
