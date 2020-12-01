import { IonHeader, IonPage} from '@ionic/react';
import React, { useState, useContext, useEffect } from 'react';


import { UserContext } from "../../UserContext";

import OnboardingSlider from '../../containers/OnboardingSlider/OnboardingSlider';
import Header from '../../components/Header/Header';

import './Onboarding.scss';

const Onboarding: React.FC = () => {
  const [userName, setUserName] = useState(null)
  const user = useContext(UserContext);
  console.log(user.firstName);

  useEffect(() => {
    if(user.firstName) {
      setUserName(user.firstName);
    }
  }, [user]);

  return (
    <IonPage>
      <IonHeader>
        <Header name={userName ? `Hello, ${userName}` : 'Hello'}/>
      </IonHeader>
      <OnboardingSlider />
    </IonPage>
  );
};

export default Onboarding;
