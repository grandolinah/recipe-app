import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';

import RecipeItem from '../../components/RecipeItem/RecipeItem';

// TODO: get all/or user`s recipes in the database

const Recipes: React.FC<RouteComponentProps> = ({ history }) => {
  const id = '123'; // ID of the recipe

  return (
    <IonPage>
      <IonContent>
        <RecipeItem
          title="meow"
          products={['mewo']}
          image="https://cdn.tasteatlas.com/images/dishes/3a0c8fdefb6c46b1a967b4fb9da96610.jpg?w=375&h=280"
          video=""
          author="me"
          steps={['one']}
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          onClickHandler={() => {
            history.push(`/app/recipes/details/${id}`);
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default Recipes;
