import React from 'react';
import { IonCard, IonCardHeader, IonImg, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';

export type RecipeItem = {
  title: string;
  products: any; // TODO: array with obj?
  image?: string;
  video?: string;
  author: string;
  steps: any; // TODO: array with strings?
  description: string;
  onClickHandler(): void;
}

const RecipeItem = ({ title, image, products, video, author, steps, description, onClickHandler }: RecipeItem) => {
  // let limitedDescription = description?.split('').slice(0, 120);

  // // add ... if the description is too long
  // if (limitedDescription?.length < description.length) {
  //   limitedDescription.push('...');
  // }

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>by {author}</IonCardSubtitle>
      </IonCardHeader>
      <IonImg src={image} />
      <IonCardContent>
        {description}
        {/* {limitedDescription} */}
      </IonCardContent>
      <IonButton
        size="small"
        expand="full"
        onClick={() => {
          onClickHandler();
        }}
        >
        Details
      </IonButton >
    </IonCard>
  );
};

export default RecipeItem;
