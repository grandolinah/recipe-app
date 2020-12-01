import { IonPage, IonTitle, IonContent, IonGrid, IonRow } from '@ionic/react';
import React  from 'react';

const Chiefs: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonTitle>Chiefs</IonTitle>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Chiefs;
