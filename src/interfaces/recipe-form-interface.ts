import { Recipe } from './recipe-interface';

export interface RecipeFormProps  {
  recipeIntro: string;
  stepDescription: string;
  productsDescription: string;
  actionButtonTitle: string;
  onPressActionButton(arg0: Recipe):  void;
}

export interface StateType {
  recipe: Recipe,
}
