import React, { useState, useContext, useEffect } from 'react';
import { IonPage, IonAvatar, IonContent, IonGrid, IonRow, IonCol, IonItem, IonInput, IonSelect, IonSelectOption, IonItemDivider, IonText } from '@ionic/react';
import { useHistory } from "react-router-dom";

import { updateUserDocument, uploadImage, signOutHandler } from '../../services/firebase-service';

import { usePhotoGallery } from '../../hooks/usePhotoGallery';

import { UserContext } from '../../context/UserContext';
import { useNotificationContext } from '../../context/NotificationContext';

import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';

import './Account.scss';

const Account: React.FC = () => {
  const user = useContext(UserContext);
  const [photoUrl, setPhotoUrl] = useState<any>(user?.photoURL ? user.photoURL
    : 'https://firebasestorage.googleapis.com/v0/b/ionic-recipes-6daa6.appspot.com/o/users%2Fdefault-user-image.png?alt=media&token=7963c406-089f-444e-9262-f22b1524fe45');
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [secondName, setSecondName] = useState<string>(user.secondName);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(user.favoriteCuisines);
  const { notification, setNotification } = useNotificationContext();
  const history = useHistory();

  const { takePhoto } = usePhotoGallery();

  const onClickUploadPhotoHandler = async () => {
    const base64Data = await takePhoto();

    uploadImage(base64Data, user.uid).then(
      function (result) {
        setPhotoUrl(result);
      },
      function (error) { console.log(error) }
    );
  };

  const onPressUpdateHandler = async () => {
    const isInfoUpdated = firstName !== user.firstName ||
      secondName !== user.secondName ||
      selectedCuisines !== user.favoriteCousines;

    if (isInfoUpdated) {
      const updatedInfo = {
        firstName,
        secondName,
        favoriteCuisines: selectedCuisines,
      }

      try {
        await updateUserDocument(user, updatedInfo);

        setNotification({
          message: 'Changes have been saved.',
          color: 'primary',
        });
      } catch (error) {
        setNotification({
          message: 'Changes have not been saved. Please try again.',
          color: 'danger',
        });
      }
    }
  };

  const onPressLogoutHandler = async () => {
    try {
      signOutHandler();
      // console.log(history);
      // history.push('/login');
    }catch(error) {
      setNotification({
        message: 'Singout failed. Please try again.',
        color: 'danger',
      });
    }
  };

  useEffect(() => {
    updateUserDocument(user, { photoURL: photoUrl });
  }, [photoUrl, user])

  return (
    <IonPage className="account">
      <Header name="Account"/>
      <IonContent>
        <IonGrid className="account__grid">
          <IonRow className="account__title">
            <IonText>Photo</IonText>
          </IonRow>
          <IonRow className="account__avatar-box ion-align-items-center ion-justify-content-center">
            <IonCol>
              <IonAvatar className="account__avatar">
                <img className="account__image" src={photoUrl} alt="user" />
              </IonAvatar>
            </IonCol>
            <IonCol>
              <Button name="change" onClickHandler={onClickUploadPhotoHandler} />
            </IonCol>
          </IonRow>
          <IonRow className="account__title">
            <IonText>Personal info</IonText>
          </IonRow>
          <IonRow className="account__input-box">
            <IonItemDivider>First Name</IonItemDivider>
            <IonCol>
              <IonItem>
                <IonInput className="account__input" value={firstName} onIonChange={e => setFirstName(e.detail.value!)}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="account__input-box">
            <IonItemDivider>Surname</IonItemDivider>
            <IonCol>
              <IonItem>
                <IonInput className="account__input" value={secondName} onIonChange={e => setSecondName(e.detail.value!)}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonItemDivider>Selected cuisines</IonItemDivider>
          <IonRow className="account__input-box">
            <IonCol>
              <IonSelect value={selectedCuisines} multiple={true} cancelText="Cancel" placeholder="Select cuisines" okText="Confirm" onIonChange={(event) => setSelectedCuisines(event.detail.value)}>
                <IonSelectOption value="italian">Italian</IonSelectOption>
                <IonSelectOption value="greek">Greek</IonSelectOption>
                <IonSelectOption value="thai">Thai</IonSelectOption>
                <IonSelectOption value="bulgarian">Bulgarian</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>
          <IonRow className="account__update-button">
            <Button name="update" onClickHandler={onPressUpdateHandler} />
          </IonRow>
          <IonRow className="account__title">
            <IonText>Theme</IonText>
            {/* TODO: */}
          </IonRow>
          <IonRow className="account__title">
            <IonText>Log out</IonText>
          </IonRow>
          <IonRow className="account__title">
            <Button name="logout" onClickHandler={onPressLogoutHandler} />
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Account;
