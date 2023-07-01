/* eslint-disable */

import { useState } from "react";
import { v4 as uuid } from "uuid";

import { useRecipe } from "../../../core/contexts/RecipeContext";
import "./Home.css";
import CustomModal from "../../shared/custom-modal-component/CustomModal";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { recipeData, addNewRecipe, updateRecipeDetails, deleteRecipe } =
    useRecipe();
  const navigate = useNavigate();

  const [searchCategory, setSearchCategory] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchRecipes = () => {
    const filteredRecipes = recipeData.filter((recipe) => {
      const value = recipe[searchCategory].toLowerCase();
      return value.includes(searchQuery.toLowerCase());
    });
    return filteredRecipes;
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditFormEnabled, setEditFormEnabled] = useState(false);

  const [currentRecipeFormFields, setCurrentRecipeFormFields] = useState({
    id: uuid(),
    image: "https://picsum.photos/208/320?random=",
    name: "",
    cuisine: "",
    ingredients: [],
    instructions: [],
  });

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditFormEnabled(false);
    setCurrentRecipeFormFields((prev) => ({
      ...prev,
      id: uuid(),
      image: "https://picsum.photos/208/320?random=",
      name: "",
      cuisine: "",
      ingredients: [],
      instructions: [],
    }));
  };

  const currentRecipeFormFieldsChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name !== "ingredients" && name !== "instructions") {
      setCurrentRecipeFormFields((prev) => ({ ...prev, [name]: value }));
    } else {
      setCurrentRecipeFormFields((prev) => ({
        ...prev,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    }
  };

  const editButtonClickHandler = (habitId) => {
    setEditFormEnabled(true);
    const recipeToBeUpdated = recipeData.find(
      (recipe) => recipe.id === habitId
    );
    setCurrentRecipeFormFields((prev) => ({ ...prev, ...recipeToBeUpdated }));
    handleOpenModal();
  };

  const submitClickHandler = (event) => {
    event.preventDefault();
    isEditFormEnabled
      ? updateRecipeDetails(currentRecipeFormFields)
      : addNewRecipe(currentRecipeFormFields);
    handleCloseModal();
  };

  return (
    <div className="recipe-main-container">
      <h2>
        {searchRecipes().length > 0 ? "All Recipes:" : "Add some Recipes"}
      </h2>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search..."
        />
        <div className="radio-buttons">
          <label>
            <input
              type="radio"
              value="name"
              checked={searchCategory === "name"}
              onChange={handleSearchCategoryChange}
            />
            Name
          </label>
          <label>
            <input
              type="radio"
              value="ingredients"
              checked={searchCategory === "ingredients"}
              onChange={handleSearchCategoryChange}
            />
            Ingredients
          </label>
          <label>
            <input
              type="radio"
              value="cuisine"
              checked={searchCategory === "cuisine"}
              onChange={handleSearchCategoryChange}
            />
            Cuisine
          </label>
        </div>
      </div>
      <div
        className={`${
          searchRecipes().length > 0
            ? "recipes-container-flex"
            : "recipes-container-column"
        }`}
      >
        {searchRecipes().length > 0 &&
          searchRecipes().map((recipe, index) => (
            <div className="recipe-card" key={recipe.id}>
              <img
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/recipe/${recipe?.id}`)}
                className="recipe-image"
                src={recipe.image + (index + 1)}
                alt={recipe.name}
              />
              <h4
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/recipe/${recipe?.id}`)}
              >
                {recipe.name}
              </h4>
              <p>{recipe.cuisine}</p>
              <div className="recipe-configuration-btns">
                <button
                  className="recipe-action-btn"
                  onClick={() => editButtonClickHandler(recipe.id)}
                >
                  Update/Details
                </button>
                <button
                  className="recipe-action-btn"
                  onClick={() => deleteRecipe(recipe.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        <button onClick={handleOpenModal} className="recipe-card">
          <FaPlus /> Create Recipe
        </button>

        <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="form-heading">
            {isEditFormEnabled ? "Edit Recipe" : "Add a New Recipe"}
          </h2>
          <form
            className="recipe-add-form"
            onSubmit={submitClickHandler}
            autoComplete="off"
          >
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name={"name"}
              value={currentRecipeFormFields.name}
              placeholder="Dal Chawal"
              onChange={currentRecipeFormFieldsChangeHandler}
              required
            />

            <label htmlFor="cuisine">Cuisine:</label>
            <input
              type="text"
              id="cuisine"
              name={"cuisine"}
              value={currentRecipeFormFields.cuisine}
              placeholder="Indian"
              onChange={currentRecipeFormFieldsChangeHandler}
              required
            />

            <label htmlFor="ingredients">Ingredients:</label>
            <input
              type="text"
              id="ingredients"
              name={"ingredients"}
              value={currentRecipeFormFields.ingredients.join(", ")}
              placeholder="Ingredient 1,Ingredient 2,..."
              onChange={currentRecipeFormFieldsChangeHandler}
              onKeyDown={(event) => {
                if (event.key === " ") {
                  event.preventDefault();
                  const { selectionStart, selectionEnd } = event.target;
                  const inputValue = event.target.value;
                  const newValue =
                    inputValue.slice(0, selectionStart) +
                    " " +
                    inputValue.slice(selectionEnd);
                  setCurrentRecipeFormFields((prev) => ({
                    ...prev,
                    ingredients: newValue.split(",").map((item) => item.trim()),
                  }));
                }
              }}
              required
            />

            <label htmlFor="instructions">Instructions:</label>
            <input
              type="text"
              id="instructions"
              name={"instructions"}
              value={currentRecipeFormFields.instructions.join(", ")}
              placeholder="Instruction 1,Instruction 2,..."
              onChange={currentRecipeFormFieldsChangeHandler}
              onKeyDown={(event) => {
                if (event.key === " ") {
                  event.preventDefault();
                  const { selectionStart, selectionEnd } = event.target;
                  const inputValue = event.target.value;
                  const newValue =
                    inputValue.slice(0, selectionStart) +
                    " " +
                    inputValue.slice(selectionEnd);
                  setCurrentRecipeFormFields((prev) => ({
                    ...prev,
                    instructions: newValue
                      .split(",")
                      .map((item) => item.trim()),
                  }));
                }
              }}
              required
            />

            <button type="submit" className="form-btn-submit">
              {isEditFormEnabled ? "Update" : "Save"}
            </button>
          </form>
        </CustomModal>
      </div>
    </div>
  );
};

export default Home;
