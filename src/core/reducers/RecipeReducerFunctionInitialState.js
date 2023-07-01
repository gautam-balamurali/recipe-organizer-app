/* eslint-disable */

export const recipeReducerInitialState = {
  recipeData: JSON.parse(localStorage.getItem("recipes")) ?? [],
  searchInput: "",
  radioButtonValue: "name",
};
