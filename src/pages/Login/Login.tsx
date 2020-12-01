import { IonContent, IonHeader, IonPage, IonGrid, IonCol, IonItem, IonLabel, IonInput, IonRow, IonButton, IonModal } from '@ionic/react';
import React, { useState, useRef, useContext } from 'react';
import { arrowForwardOutline } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPasswordHandler } from '../../services/firebase-service';
import { UserContext } from "../../UserContext";

import urls from "../../config/urls";

import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import InputItem from '../../components/Input/Input';

import './Login.scss';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  let emailInputRef = useRef<HTMLIonInputElement>(null);
  let passwordInputRef = useRef<HTMLIonInputElement>(null);
  let confirmPasswordInputRef = useRef<HTMLIonInputElement>(null);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [emailLabel, setEmailLabel] = useState<string>('email');
  const [emailLabelColor, setEmailLabelColor] = useState<string>('primary');

  const [passwordLabel, setPasswordLabel] = useState<string>('password');
  const [passwordLabelColor, setPasswordLabelColor] = useState<string>('primary');

  const [confirmPasswordLabel, setConfirmPasswordLabel] = useState<string>('confirm Password');
  const [confirmPasswordLabelColor, setConfirmPasswordLabelColor] = useState<string>('primary');

  const user = useContext(UserContext);

  const onClickLoginHandler = async () => {
    const email = emailInputRef.current ? emailInputRef.current?.value : null;
    const password = passwordInputRef.current ? passwordInputRef.current?.value : null;

    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === '' || !regex.test(`${email}`)) {
      setEmailLabelColor('danger');

      if (email === '') {
        setEmailLabel('write your email');
      } else if (!regex.test(`${email}`)) {
        setEmailLabel('incorrect email');
      }
    } else {
      setEmailLabel('email');
      setEmailLabelColor('primary');
    }

    if (password === '') {
      setPasswordLabel('write your password');
      setPasswordLabelColor('danger');
    } else {
      setPasswordLabel('password');
      setPasswordLabelColor('primary');
    }

    if (email !== '' && password !== '' && regex.test(`${email}`)) {
      // auth
      signInWithEmailAndPasswordHandler(email, password);

      if (user.firstName) {
        history.push(urls.APP_HOME);
      } else {
        history.push(urls.ONBOARDING);
      }

      // web
      sessionStorage.setItem('isLogged', 'true');

      // clean input
      emailInputRef.current!.value = '';
      passwordInputRef.current!.value = '';
    }
  };

  const onClickGToRegisterHandler = () => {
    // reset all
    emailInputRef.current!.value = '';
    passwordInputRef.current!.value = '';

    setIsModalVisible(!isModalVisible);
  };

  const onClickRegisterHandler = () => {
    // TODO register

    // TODO error notification
    // if passwords dont match
    // if empty input
    // if already registered

    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const confirmPassword = confirmPasswordInputRef.current?.value;

    if (password === confirmPassword && email !== '') {
      // register
      createUserWithEmailAndPassword(email, password);
    } else if (password !== confirmPassword) {
      // notificaiton passwords dont match
    }
    // if all good
    setIsModalVisible(false);

    // clean input
    emailInputRef.current!.value = '';
    passwordInputRef.current!.value = '';
    confirmPasswordInputRef.current!.value = '';
  };

  return (
    <IonPage>
      <IonHeader>
        <Header name="Login" />
      </IonHeader>
      <IonContent className="ion-padding home-page">
        <IonGrid className="home-page__grid">
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating" color={emailLabelColor}>{emailLabel}</IonLabel>
                <IonInput className="input" ref={emailInputRef} clearInput></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating" color={passwordLabelColor}>{passwordLabel}</IonLabel>
                <IonInput ref={passwordInputRef} type="password" clearInput></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin-top">
            <Button onClickHandler={onClickLoginHandler} name="Login" icon={arrowForwardOutline} />
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
                  <IonLabel position="floating" color={emailLabelColor}>{emailLabel}</IonLabel>
                  <IonInput className="input" ref={emailInputRef} clearInput></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating" color={passwordLabelColor}>{passwordLabel}</IonLabel>
                  <IonInput ref={passwordInputRef} type="password" clearInput></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating" color={confirmPasswordLabelColor}>{confirmPasswordLabel}</IonLabel>
                  <IonInput ref={confirmPasswordInputRef} type="password" clearInput></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center ion-margin-top">
              <Button onClickHandler={onClickRegisterHandler} name="Register" icon={arrowForwardOutline} />
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Login;
