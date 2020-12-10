import { IonHeader, IonPage} from '@ionic/react';
import React from 'react';

import OnboardingSlider from '../../containers/OnboardingSlider/OnboardingSlider';
import Header from '../../components/Header/Header';

import './Onboarding.scss';

const Onboarding = () => {
  return (
    <IonPage>
      <IonHeader>
        <Header name={'Hello there'}/>
      </IonHeader>
      <OnboardingSlider/>
    </IonPage>
  );
};

export default Onboarding;
