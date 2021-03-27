import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonText } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';

import { getAllRecipes } from '../../services/firebase-service';

import RecipeItem from '../../components/RecipeItem/RecipeItem';

// TODO: get all/or user`s recipes in the database

const Recipes: React.FC<RouteComponentProps> = ({ history }) => {
  const [recipes, setRecipes] = useState<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const unlisten = async () => {
      const allRecipes = await getAllRecipes();

      if (allRecipes?.recipes) {
        setRecipes(allRecipes.recipes);
        setIsLoaded(true);
      }
    };

    return () => {
      unlisten();
    }
  });

  return (
    <IonPage>
      <IonContent>
        {isLoaded ? (
          recipes ? (
            recipes.map((item: any) => {
              return (
                <RecipeItem
                  title={item.title}
                  products={item.products}
                  image={item.image}
                  video={item.video}
                  author={item.userId}
                  steps={item.steps}
                  description={item.description}
                  onClickHandler={() => {
                    history.push(`/app/recipes/details/${item.id}`);
                  }}
                />
              );
            })
          ) : (
            <IonText>no recipes</IonText>
          )
        ) : (
          <IonText>loading</IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Recipes;
