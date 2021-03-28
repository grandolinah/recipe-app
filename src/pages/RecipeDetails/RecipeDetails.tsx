import React, { useState, useEffect } from 'react';
import { IonContent, IonGrid, IonPage, IonRow, IonImg, IonItem, IonIcon, IonTitle, IonBackButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { pin } from 'ionicons/icons';

import Header from '../../components/Header/Header';

import { getRecipe } from '../../services/firebase-service';

interface RecipeDetailsProps extends RouteComponentProps <{
  id: string;
}> {}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({match, history}) => {
  const { id } = match.params;
  const [recipe, setRecipe] = useState<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const unlisten = async () => {
      const recipe = await getRecipe(id);

      if (recipe) {
        setRecipe(recipe);
        setIsLoaded(true);
      }
    };

    console.log(recipe);
    return () => {
      unlisten();
    }
    
  });


  return (
    <IonPage>
      <Header name={recipe ? recipe.title : 'missiong'} />
      <IonContent>
        <IonBackButton />
        {id}
        <IonGrid>
          {/* <IonRow>
            <IonTitle>{title}</IonTitle>
            <IonTitle size="small">by {author}</IonTitle>
          </IonRow>
          <IonRow>
            <IonImg src={image} />
          </IonRow>
          <IonRow>
            Products: */}
          {/* {products.map((product: any) => {
            return (
              <IonItem className="ion-activated">
                <IonIcon icon={pin} slot="start" />
                {product.item} - {product.quantity}
              </IonItem>
            )
          })} */}
          {/* </IonRow>
          <IonRow>
            {description} */}
            {/* {steps.map((step: string, index: number) => {
              return (
                <IonItem className="ion-activated">
                  <IonIcon icon={pin} slot="start" />
                  {index + 1}. {step}
                </IonItem>
              )
            })} */}
          {/* </IonRow>*/}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RecipeDetails;
