import React from 'react';
import { IonPage} from '@ionic/react';

import OnboardingSlider from '../../containers/OnboardingSlider/OnboardingSlider';
import Header from '../../components/Header/Header';

const Onboarding = () => {
  return (
    <IonPage>
      <Header name={'Hello there'}/>
      <OnboardingSlider/>
    </IonPage>
  )
};

export default Onboarding;
