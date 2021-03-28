import React  from 'react';
import { IonPage, IonTitle, IonContent, IonGrid, IonRow } from '@ionic/react';

import Header from '../../components/Header/Header';

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header name="Home" />
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
