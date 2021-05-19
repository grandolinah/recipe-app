import React, { useEffect, useState } from 'react';
import { IonText, IonContent, IonSpinner } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';

import { getAllRecipes } from '../../services/firebase-service';

import PageLayout from '../../layouts/PageLayout';
import RecipeItem from '../../components/RecipeItem/RecipeItem';

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const [recipes, setRecipes] = useState<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const renderRecipesHelper = () => {
    if (recipes.length > 0) {
      return recipes.map((item: any, index: number) => {
        return (
          <RecipeItem
            key={index + 1}
            title={item.title}
            image={item.image}
            video={item.video}
            author={item.userId}
            description={item.description}
            onClickDetailsHandler={() => {
              history.push(`/app/home/details/${item.id}`); 
            }}
            onClickFavoriteHandler={() => {
              // TODO: add recipe to favorites
            }}
          />
        );
      });
    };

    return (
      <IonText>No recipes</IonText>
    );
  };

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
      {isLoaded ? renderRecipesHelper() : (
        <IonContent className="spinner-wrapper">
          <IonSpinner name="circles" color={"primary"} />
        </IonContent>
      )}
    </PageLayout>
  );
};

export default Home;
