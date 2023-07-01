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
    if (name !== "ingredients" && name !== "instructions")
      setCurrentRecipeFormFields((prev) => ({ ...prev, [name]: value }));
    else
      setCurrentRecipeFormFields((prev) => ({
        ...prev,
        [name]: [...prev[name], value],
      }));
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

  const navigate = useNavigate();

  return (
    <>
      <h2>{recipeData.length > 0 ? "All Recipes:" : "Add some Recipes"}</h2>
      <div
        className={`${
          recipeData.length > 0
            ? "recipes-container-flex"
            : "recipes-container-column"
        }`}
      >
        {recipeData.length > 0 &&
          recipeData.map((recipe, index) => (
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

            <button type="submit" className="form-btn-submit">
              {isEditFormEnabled ? "Update" : "Save"}
            </button>
          </form>
        </CustomModal>
      </div>
    </>
  );
};

export default Home;
