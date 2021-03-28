import React  from 'react';
import { IonPage, IonTitle, IonContent, IonGrid, IonRow } from '@ionic/react';

import Header from '../../components/Header/Header';

const Chiefs: React.FC = () => {
  return (
    <IonPage>
      <Header name="Chiefs" />
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
