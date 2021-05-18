import React, { useEffect, useState } from 'react';
import { IonText } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';

import { getAllRecipes } from '../../services/firebase-service';

import PageLayout from '../../layouts/PageLayout';
import RecipeItem from '../../components/RecipeItem/RecipeItem';

// TODO: get all/or user`s recipes in the database

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const [recipes, setRecipes] = useState<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const unlisten = async () => {
      if (!isLoaded) {
        const allRecipes = await getAllRecipes();

        if (allRecipes?.recipes) {
          setRecipes(allRecipes.recipes);
          setIsLoaded(true);
        }
      }
    };

    return () => {
      unlisten();
    };
  });

  return (
    <PageLayout name="Home">
      {isLoaded ? (
        recipes ? (
          recipes.map((item: any, index: number) => {
            return (
              <RecipeItem
                key={index}
                title={item.title}
                products={item.products}
                image={item.image}
                video={item.video}
                author={item.userId}
                steps={item.steps}
                description={item.description}
                onClickHandler={() => {
                  history.push(`/app/home/details/${item.id}`);
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
    </PageLayout>
  );
};

export default Home;
