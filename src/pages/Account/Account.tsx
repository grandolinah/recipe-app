import { IonPage, IonTitle, IonContent, IonGrid, IonRow } from '@ionic/react';
import React from 'react';

const Account: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonTitle>Account</IonTitle>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Account;
