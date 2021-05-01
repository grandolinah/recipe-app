import React, { useEffect, useState, useContext } from "react";
import { IonRow, IonText } from "@ionic/react";
import { RouteComponentProps } from "react-router-dom";
// import { v4 as uuid } from 'uuid';

import { getUserRecipes } from "../../services/firebase-service";

import { UserContext } from "../../context/UserContext";

import Button from "../../components/Button/Button";
import PageLayout from "../../layouts/PageLayout";
import RecipeItem from "../../components/RecipeItem/RecipeItem";

// TODO: get all/or user`s recipes in the database

import './Recipes.scss';

const Recipes: React.FC<RouteComponentProps> = ({ history }) => {
  const [recipes, setRecipes] = useState<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const user = useContext(UserContext);

  console.log(recipes);

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
      unlisten();
    };
  });

  return (
    <PageLayout name="Recipes" className="recipes">
      <IonRow className="recipes__button-container">
        <Button
          name="Create new recipe"
          onClickHandler={() => history.push("/app/recipes/create")}
        />
      </IonRow>

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

export default Recipes;
