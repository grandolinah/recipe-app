import React from 'react';
import { RouteComponentProps } from 'react-router';

import RecipeForm from '../../../components/RecipeForm/RecipeForm';
import PageLayout from '../../../layouts/PageLayout';
import { updateRecipe } from '../../../services/firebase-service';
import { Recipe } from '../../../interfaces/recipe-interface';
import url from '../../../config/urls';

const EditRecipe: React.FC<RouteComponentProps> = ({ history, match }: RouteComponentProps<{ id?: string}>) => {
  const onUpdateRecipeHandler = (recipe: Recipe) => {
    const recipeId = match.params.id;

    updateRecipe(recipe, recipeId);

    history.push(url.MY_RECIPES);
  };

  return (
    <PageLayout name="Edit recipe" backButton className="edit-recipe">
      <RecipeForm
        recipeIntro="This is the recipe that you already saved.."
        stepDescription="You can manage steps here:"
        productsDescription="You can manage products here:"
        onPressActionButton={onUpdateRecipeHandler}
        actionButtonTitle="Update"
      />
    </PageLayout>
  );
};

export default EditRecipe;
