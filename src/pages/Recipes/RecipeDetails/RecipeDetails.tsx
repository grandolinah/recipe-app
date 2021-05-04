import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonImg,
  IonList,
  IonItem,
  IonTitle,
  IonSpinner,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";

import PageLayout from "../../../layouts/PageLayout";
import Button from "../../../components/Button/Button";
import { getRecipe } from "../../../services/firebase-service";

import "./RecipeDetails.scss";

interface RecipeDetailsProps
  extends RouteComponentProps<{
    id: string;
  }> {}

interface Product {
  item: string;
  quantity: string;
}

interface Recipe {
  id: string;
  video: string;
  image: string;
  title: string;
  userId: string;
  description: string;
  steps: string[];
  products: Product[];
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ match, history }) => {
  const { id } = match.params;
  const [recipe, setRecipe] = useState<Recipe | any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const unlisten = async () => {
      if (!isLoaded) {
        const recipeById = await getRecipe(id);

        if (recipeById) {
          setRecipe(recipeById.recipe);
          setIsLoaded(true);
        }
      }
    };

    return () => {
      unlisten();
    };
  });

  console.log(recipe);
  return (
    <PageLayout name={recipe ? recipe.title : "Loading"} backButton>
      <Button name="Back" onClickHandler={() => history.goBack()} />

      <IonContent>
        {recipe ? (
          <IonGrid className="recipe-detail">
            <IonRow className="recipe-detail__image-box">
              <IonTitle size="large" className="recipe-detail__title">
                {recipe.title} by {recipe.userID}
              </IonTitle>
              <IonImg src={recipe.image} className="recipe-detail__image" />
            </IonRow>
            <IonTitle size="small" className="recipe-detail__sub-title">
              Products:
            </IonTitle>
            <IonRow className="recipe-detail__products">
              <IonList>
                {recipe.products.map((product: any, index: number) => {
                  return (
                    <IonItem key={index}>
                      {product.item} - {product.quantity}
                    </IonItem>
                  );
                })}
              </IonList>
            </IonRow>

            <IonRow className="recipe-detail__description">
              {recipe.description}
            </IonRow>
            <IonTitle size="small" className="recipe-detail__sub-title">
              Step by step:
            </IonTitle>
            <IonRow className="recipe-detail__steps">
              <IonList>
                {recipe.steps.map((step: string, index: number) => {
                  return (
                    <IonItem key={index}>
                      {index + 1}. {step}
                    </IonItem>
                  );
                })}
              </IonList>
            </IonRow>
          </IonGrid>
        ) : (
          <IonSpinner name="circles" color={"primary"} />
        )}
      </IonContent>
    </PageLayout>
  );
};

export default RecipeDetails;
