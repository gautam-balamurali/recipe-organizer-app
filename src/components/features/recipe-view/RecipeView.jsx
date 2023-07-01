/* eslint-disable */

import { FaAngleLeft } from "react-icons/fa";
import "./RecipeView.css";
import { useNavigate } from "react-router-dom";

const RecipeView = ({ recipeDetails }) => {
  const { image, name, cuisine, ingredients, instructions } = recipeDetails;

  const navigate = useNavigate();

  return (
    <div className="recipe-details-container">
      <h2>{name}</h2>
      {recipeDetails?.name && (
        <div className="recipe-details-section">
          <div className="recipe-image-container">
            <img src={image} alt={name} />
          </div>
          <div className="recipe-details-info">
            <h3>Cuisine: {cuisine}</h3>
            <strong>Ingredients: </strong>
            <p>{ingredients.join(", ")}</p>
            <strong>Instructions: </strong>
            <ul>
              {instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <p style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
        <FaAngleLeft /> Go Back
      </p>
    </div>
  );
};

export default RecipeView;
