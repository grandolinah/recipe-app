import { IonPage, IonTitle, IonContent, IonGrid, IonRow } from '@ionic/react';
import React  from 'react';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonTitle>Home</IonTitle>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
