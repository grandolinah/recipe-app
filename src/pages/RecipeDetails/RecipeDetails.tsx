import React, { useState, useEffect } from 'react';
import { IonContent, IonGrid, IonPage, IonRow, IonImg, IonItem, IonIcon, IonTitle, IonBackButton,
  IonSpinner, IonToolbar, IonButtons } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { pin } from 'ionicons/icons';

import Header from '../../components/Header/Header';

import { getRecipe } from '../../services/firebase-service';

interface RecipeDetailsProps extends RouteComponentProps <{
  id: string;
}> {}

interface Recipe {
  id: string;
  video: string;
  image: string;
  title: string;
  userId: string;
  steps: any;
  products: any
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({match, history}) => {
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
    }
  });

  return (
    <IonPage>
      <Header name={recipe ? recipe.title : 'missing'} backButton />
      <IonContent>
        {recipe ? (
        <IonGrid>
          <IonRow>
            <IonTitle size="small">{recipe.title} by {recipe.userID}</IonTitle>
          </IonRow>
          <IonRow>
            <IonImg src={recipe.image} />
          </IonRow>
          <IonRow>
            Products:
          {recipe.products.map((product: any, index: number) => {
            return (
              <IonItem className="ion-activated" key={index}>
                <IonIcon icon={pin} slot="start" />
                {product.item} - {product.quantity}
              </IonItem>
            )
          })}
          </IonRow>
          <IonRow>
            {recipe.description}
            {recipe.steps.map((step: string, index: number) => {
              return (
                <IonItem className="ion-activated" key={index}>
                  <IonIcon icon={pin} slot="start" />
                  {index + 1}. {step}
                </IonItem>
              )
            })}
          </IonRow>
         </IonGrid>
        ) : (
          // Todo make component
          <IonSpinner name="circles" color={"primary"}/>
        )}
      </IonContent>
    </IonPage>
  );
};

export default RecipeDetails;
