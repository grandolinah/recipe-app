import { IonPage, IonTitle, IonContent, IonGrid, IonRow } from '@ionic/react';
import React  from 'react';

const Recipes: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonTitle>Recipes</IonTitle>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Recipes;
