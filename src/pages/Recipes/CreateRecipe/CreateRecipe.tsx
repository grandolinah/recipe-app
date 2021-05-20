import React from 'react';
import { RouteComponentProps } from 'react-router';

import { Recipe } from '../../../interfaces/recipe-interface';
import { createRecipe } from '../../../services/firebase-service';
import PageLayout from '../../../layouts/PageLayout';
import RecipeForm from '../../../components/RecipeForm/RecipeForm';
import url from '../../../config/urls';

import './CreateRecipe.scss';

const CreateRecipe: React.FC<RouteComponentProps> = ({ history }) => {
  const onCreateRecipeHandler = (newRecipe: Recipe) => {
    createRecipe(newRecipe);

    history.push(url.MY_RECIPES);
  };

  return (
    <PageLayout name="New recipe" backButton className="create-recipe">
      <RecipeForm
        recipeIntro="Add new recipe here, all you need to add is steps, products and some
        extra info.."
        stepDescription="Help your followers with step by step recipe, add steps bellow:"
        productsDescription="Now its time to make a list with the products:"
        onPressActionButton={onCreateRecipeHandler}
        actionButtonTitle="Create"
      />
    </PageLayout>
  );
};

export default CreateRecipe;
