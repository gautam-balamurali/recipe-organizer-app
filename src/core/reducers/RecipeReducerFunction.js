export const recipeReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_RECIPE_DATA":
      return { ...state, recipeData: [...payload] };
    case "ADD_NEW_RECIPE":
      return { ...state, recipeData: [...state.recipeData, payload] };
    case "UPDATE_RECIPE_DETAILS":
      return { ...state, recipeData: [...payload] };
    default:
      return state;
  }
};
