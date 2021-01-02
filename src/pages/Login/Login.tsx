import { IonContent, IonHeader, IonPage, IonGrid, IonCol, IonItem, IonLabel, IonInput, IonRow, IonButton, IonModal } from '@ionic/react';
import React, { useState, useRef } from 'react';
import { arrowForwardOutline } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPasswordHandler } from '../../services/firebase-service';

import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';

import './Login.scss';

const Login: React.FC<RouteComponentProps> = () => {
  let emailInputRef = useRef<HTMLIonInputElement>(null);
  let passwordInputRef = useRef<HTMLIonInputElement>(null);
  let confirmPasswordInputRef = useRef<HTMLIonInputElement>(null);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [emailLabel, setEmailLabel] = useState<string>('email');
  const [emailLabelColor, setEmailLabelColor] = useState<string>('primary');

  const [passwordLabel, setPasswordLabel] = useState<string>('password');
  const [passwordLabelColor, setPasswordLabelColor] = useState<string>('primary');

  const [confirmPasswordLabel, setConfirmPasswordLabel] = useState<string>('confirm password');
  const [confirmPasswordLabelColor, setConfirmPasswordLabelColor] = useState<string>('primary');


  const validateInput = (form: string, email: any, password: any, confirmPassword: any) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailIncorrect = !regex.test(`${email}`);
    const emailNoInput = email === '';
    const passwordNoInput = password === '';
    const confirmPasswordNoInput = confirmPassword === '';
    const passwordsDontMatch = password !== confirmPassword;

    if (emailIncorrect || emailNoInput) {
      setEmailLabelColor('danger');

      if (emailNoInput) {
        setEmailLabel('write your email');
      } else if (emailIncorrect) {
        setEmailLabel('incorrect email');
      }
    } else {
      setEmailLabel('email');
      setEmailLabelColor('primary');
    }

    if (passwordNoInput) {
      setPasswordLabel('write your password');
      setPasswordLabelColor('danger');
    } else {
      setPasswordLabel('password');
      setPasswordLabelColor('primary');
    }

    if (form === 'register') {
      if (passwordsDontMatch || confirmPasswordNoInput) {
        if (confirmPasswordNoInput) {
          setConfirmPasswordLabel('should be at least 6 chars');
          setConfirmPasswordLabelColor('danger');
        } else if (passwordsDontMatch) {
          setPasswordLabel('passwords do not match');
          setPasswordLabelColor('danger');

          setConfirmPasswordLabel('passwords do not match');
          setConfirmPasswordLabelColor('danger');
        } else if (!passwordsDontMatch) {
          setPasswordLabel('password');
          setPasswordLabelColor('primary');

          setConfirmPasswordLabel('confirm password');
          setConfirmPasswordLabelColor('primary');
        } else {
          setConfirmPasswordLabel('confirm password');
          setConfirmPasswordLabelColor('primary');
        }
      }
    }

    if (password !== '' && regex.test(`${email}`) && form === 'login') {
      return true;
    }

    if (password !== '' && regex.test(`${email}`) && password === confirmPassword && form === 'register') {
      return true;
    }

    return false;
  }

  const onClickLoginHandler = async () => {
    const email = emailInputRef.current ? emailInputRef.current?.value : null;
    const password = passwordInputRef.current ? passwordInputRef.current?.value : null;

    const isValidated = validateInput('login', email, password, null);

    if (isValidated) {
      signInWithEmailAndPasswordHandler(email, password);

      // clean input
      emailInputRef.current!.value = '';
      passwordInputRef.current!.value = '';
    }
  };

  const onClickRegisterHandler = () => {
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const confirmPassword = confirmPasswordInputRef.current?.value;
    const isValidated = validateInput('register', email, password, confirmPassword);

    if (isValidated) {
      createUserWithEmailAndPassword(email, password);
      setIsModalVisible(false);

      // clean input
      emailInputRef.current!.value = '';
      passwordInputRef.current!.value = '';
      confirmPasswordInputRef.current!.value = '';
    }
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
                <IonInput className="input" ref={emailInputRef} clearInput ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating" color={passwordLabelColor}>{passwordLabel}</IonLabel>
                <IonInput ref={passwordInputRef} type="password" clearInput ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin-top">
            <Button onClickHandler={onClickLoginHandler} name="Login" icon={arrowForwardOutline} />
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin-top">
            <IonButton onClick={() => setIsModalVisible(!isModalVisible)} color="dark" fill="clear" size="small">Dont have account?</IonButton>
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
