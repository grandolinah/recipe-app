import { IonPage, IonSpinner, IonTitle, IonContent, IonGrid, IonRow } from '@ionic/react';
import React  from 'react';

import './Loading.scss';

const Loading: React.FC = () => {
  return (
    <IonPage className="loading-page">
      <IonContent>
        <IonGrid className="loading-page__grid">
          <IonRow>
            <IonTitle className="loading-page__title">Loading</IonTitle>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonSpinner name="circles" color={"primary"} className="loading-page__spinner"/>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Loading;
