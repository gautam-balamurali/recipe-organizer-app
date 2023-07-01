/* eslint-disable */

import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import PageNotFound from "../../pages/PageNotFound";
import RecipePage from "../../pages/RecipePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipe/:recipeId" element={<RecipePage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
