import React, { useEffect, useState, useContext } from 'react';
import { IonRow, IonText, IonSpinner, IonContent } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';

import { getUserRecipes, deleteRecipe } from '../../services/firebase-service';
import urls from '../../config/urls';
import { UserContext } from '../../context/UserContext';
import Button from '../../components/Button/Button';
import PageLayout from '../../layouts/PageLayout';
import RecipeItem from '../../components/RecipeItem/RecipeItem';
import { useNotificationContext } from '../../context/NotificationContext';

import './Recipes.scss';

const Recipes: React.FC<RouteComponentProps> = ({ history }) => {
  const [recipes, setRecipes] = useState<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const user = useContext(UserContext);
  const { setNotification } = useNotificationContext();

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
            authorable
            onClickDeleteHandler={() => {
              deleteRecipe(item.id);
  
              setNotification({
                message: 'You deleted the recipe successfully.',
                color: 'primary',
              });
  
              setIsLoaded(false);
            }}
            onClickEditHandler={() => {
              history.push({
                pathname: `/app/recipes/edit/${item.id}`,
                state: {
                  recipe: item,
                },
              });
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
      const allRecipes = await getUserRecipes(user.uid);

      if (allRecipes?.recipes) {
        setRecipes(allRecipes.recipes);
        setIsLoaded(true);
      }
    };

    return () => {
      unlisten();
    };
  });

  return (
    <PageLayout name="Recipes" className="recipes">
      <IonRow className="recipes__button-container">
        <Button
          name="Create new recipe"
          onClickHandler={() => history.push(urls.CREATE_RECIPE)}
        />
      </IonRow>
      {isLoaded ? renderRecipesHelper() : (
        <IonContent className="spinner-wrapper">
          <IonSpinner name="circles" color={"primary"} />
        </IonContent>
      )}
    </PageLayout>
  );
};

export default Recipes;
