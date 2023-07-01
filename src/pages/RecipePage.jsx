import { useParams } from "react-router-dom";

import RecipeView from "../components/features/recipe-view/RecipeView";
import { useRecipe } from "../core/contexts/RecipeContext";

const RecipePage = () => {
  const { recipeId } = useParams();
  const { recipeData } = useRecipe();

  const recipeDetails = recipeData.find((recipe) => recipe.id === recipeId);

  return <RecipeView recipeDetails={recipeDetails} />;
};

export default RecipePage;
