import React, { useState } from 'react';
import {
  IonActionSheet,
  IonCard,
  IonCardHeader,
  IonImg,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from '@ionic/react';
import { trash, create, close } from 'ionicons/icons';

export type RecipeItem = {
  title: string;
  products: any; // TODO: array with obj?
  image?: string;
  video?: string;
  author: string;
  steps: any; // TODO: array with strings?
  description: string;
  onClickHandler(): void;
  authorable?: boolean;
  onClickEditHandler?(): void;
  onClickDeleteHandler?(): void;
}

const RecipeItem = ({
  title,
  image,
  products,
  video,
  author,
  steps,
  description,
  onClickHandler,
  onClickEditHandler,
  onClickDeleteHandler,
  authorable,
}: RecipeItem) => {
  const [showActionSheet, setShowActionSheet] = useState<boolean>(false);

  const descriptionHelper = () => {
    let limitedDescription = description?.split('').slice(0, 120);

    // add ... if the description is too long
    if (limitedDescription?.length < description.length) {
      limitedDescription.push('...');
    }
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>by {author}</IonCardSubtitle>
      </IonCardHeader>
      <IonImg src={image} />
      <IonCardContent>
        {descriptionHelper()}
        {!authorable && (
          <IonButton
            size="small"
            expand="full"
            onClick={() => {
              onClickHandler();
            }}
          >
            Details
          </IonButton>
        )}

        {authorable && (
          <>
            <IonButton onClick={() => setShowActionSheet(true)} expand="block">
              Options
          </IonButton>
            <IonActionSheet
              isOpen={showActionSheet}
              onDidDismiss={() => setShowActionSheet(false)}
              cssClass='my-custom-class'
              buttons={[{
                text: 'Delete',
                role: 'destructive',
                icon: trash,
                handler: () => {
                  onClickDeleteHandler && onClickDeleteHandler();
                }
              }, {
                text: 'Edit',
                icon: create,
                handler: () => {
                  onClickEditHandler && onClickEditHandler();
                }
              }, {
                text: 'Cancel',
                icon: close,
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              }]}
            >
            </IonActionSheet>
          </>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default RecipeItem;
