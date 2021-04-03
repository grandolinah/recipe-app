import React, { useEffect, useState, useContext } from 'react';
import { IonPage, IonContent, IonText } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
// import { v4 as uuid } from 'uuid';

import { getUserRecipes } from '../../services/firebase-service';

import { UserContext } from '../../context/UserContext';

import Header from '../../components/Header/Header';
import RecipeItem from '../../components/RecipeItem/RecipeItem';

// TODO: get all/or user`s recipes in the database

const Recipes: React.FC<RouteComponentProps> = ({ history }) => {
  const [recipes, setRecipes] = useState<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const user = useContext(UserContext);

  useEffect(() => {
    const unlisten = async () => {
      if (!isLoaded) {
        const allRecipes = await getUserRecipes(user.uid);
  
        if (allRecipes?.recipes) {
          setRecipes(allRecipes.recipes);
          setIsLoaded(true);
        }
      }
    };

    return () => {
      unlisten()
    }
  });

  return (
    <IonPage>
      <Header name="Recipes" />
      <IonContent>
        {isLoaded ? (
          recipes ? (
            recipes.map((item: any, index: number) => {
              return (
                <RecipeItem
                  // key={uuid()}
                  key={index + 1}
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
