import { IonContent, IonHeader, IonPage, IonGrid, IonCol, IonItem, IonLabel, IonInput, IonRow, IonButton, IonModal } from '@ionic/react';
import React, { useState } from 'react';

import { arrowForwardOutline } from 'ionicons/icons';

import Button from '../components/Button';
import Toolbar from '../components/Toolbar';

import './Login.scss';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const onClickLoginHandler = () => {
    if (email !== '' && password !== '') {
      console.log(email, password);

      // TODO authenticate

      // go to onbording screens
    }
  };

  const onClickGToRegisterHandler = () => {
    setEmail('');
    setPassword('');

    setIsModalVisible(!isModalVisible);
  };

  const onClickRegisterHandler = () => {
    // TODO register

    // TODO error notification
    // if passwords dont match
    // if empty input
    // if already registered

    if (password === confirmPassword && email !== '') {

    } else if (password !== confirmPassword) {
      // notificaiton passwords dont match
    }
    // if all good
    setIsModalVisible(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <Toolbar name="Login" />
      </IonHeader>
      <IonContent className="ion-padding home-page">
        <IonGrid className="home-page__grid">
          <IonRow className="home-page__row" >
            <IonCol>
              <IonItem>
                <IonLabel position="floating">email</IonLabel>
                <IonInput className="input" value={email} onIonChange={e => setEmail(e.detail.value!)} clearInput></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">password</IonLabel>
                <IonInput value={password} type="password" onIonChange={e => setPassword(e.detail.value!)} clearInput></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin-top">
            <Button onClickHandler={onClickLoginHandler} name="Login" icon={arrowForwardOutline}/>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin-top">
            <IonButton onClick={onClickGToRegisterHandler} color="dark" fill="clear" size="small">Dont have account?</IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonModal isOpen={isModalVisible} cssClass="home-page__modal" backdropDismiss={true} swipeToClose={true}>
        <IonContent className="ion-padding">
          <IonGrid className="home-page__grid">
            <IonRow className="home-page__row" >
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">email</IonLabel>
                  <IonInput className="input" value={email} onIonChange={e => setEmail(e.detail.value!)} clearInput></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">password</IonLabel>
                  <IonInput value={password} type="password" onIonChange={e => setPassword(e.detail.value!)} clearInput></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">confirm password</IonLabel>
                  <IonInput value={confirmPassword} type="password" onIonChange={e => setConfirmPassword(e.detail.value!)} clearInput></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center ion-margin-top">
              <Button onClickHandler={onClickRegisterHandler} name="Register" icon={arrowForwardOutline}/>
            </IonRow>
          </IonGrid>
        </IonContent>
        </IonModal>
    </IonPage>
  );
};

export default Login;
