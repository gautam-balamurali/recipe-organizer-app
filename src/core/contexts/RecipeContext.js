/* eslint-disable */

import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";

import { recipeReducer } from "../reducers/RecipeReducerFunction";
import { recipeReducerInitialState } from "../reducers/RecipeReducerFunctionInitialState";
import { recipes } from "../database/Database";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    recipeReducer,
    recipeReducerInitialState
  );

  useEffect(() => {
    dispatch({ type: "FETCH_RECIPE_DATA", payload: recipes });
  }, []);

  const addNewRecipe = (recipe) => {
    dispatch({ type: "ADD_NEW_RECIPE", payload: recipe });
    toast.success("New Recipe added.");
  };

  const updateRecipeDetails = (updatedRecipe) => {
    const newRecipeDetails = state.recipeData.map((recipe) =>
      recipe.id === updatedRecipe.id ? { ...recipe, ...updatedRecipe } : recipe
    );
    dispatch({
      type: "UPDATE_RECIPE_DETAILS",
      payload: newRecipeDetails,
    });
    toast.success("Recipe updated!");
  };

  const deleteRecipe = (recipeID) => {
    const newRecipeDetails = state.recipeData.filter(
      (recipe) => recipe.id !== recipeID
    );
    dispatch({
      type: "UPDATE_RECIPE_DETAILS",
      payload: newRecipeDetails,
    });
    toast.success("Recipe deleted!");
  };

  return (
    <RecipeContext.Provider
      value={{
        ...state,
        dispatch,
        addNewRecipe,
        updateRecipeDetails,
        deleteRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipe = () => useContext(RecipeContext);
