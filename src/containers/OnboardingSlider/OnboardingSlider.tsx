import React, { useRef, useContext, useState, useEffect } from 'react';
import { IonSlides, IonSlide, IonContent, IonGrid, IonCol, IonRow, IonInput, IonItem, IonLabel, IonText, IonSelect, IonSelectOption, IonAvatar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory } from '@capacitor/core';

import { UserContext } from '../../context/UserContext';
import { useNotificationContext } from '../../context/NotificationContext';

import Button from '../../components/Button/Button';

import { updateUserDocument, uploadImage } from '../../services/firebase-service';

import './OnboardingSlider.scss';

import urls from '../../config/urls';

const PHOTO_STORAGE = 'photos';

export interface Photo {
  filepath: string;
  webviewPath?: string;
}

let swiper: any;

const slideOpts = {
  initialSlide: 0,
  speed: 400,
  allowTouchMove: false,
  pagination: false,
  on: {
    beforeInit() {
      swiper = this;
    },
  }
};

export interface PhotoInterface {
  filepath: string;
  webviewPath?: string;
}

const OnboardingSlider = () => {
  const firstNameInputRef = useRef<HTMLIonInputElement>(null);
  const secondNameInputRef = useRef<HTMLIonInputElement>(null);
  const history = useHistory();
  const { set } = useStorage();
  const { getPhoto } = useCamera();
  const { readFile, writeFile } = useFilesystem();
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const user = useContext(UserContext);
  const [photoUrl, setPhotoUrl] = useState<any>(user?.photoURL ? user.photoURL
    : 'https://firebasestorage.googleapis.com/v0/b/ionic-recipes-6daa6.appspot.com/o/users%2Fdefault-user-image.png?alt=media&token=7963c406-089f-444e-9262-f22b1524fe45');
  const { notification, setNotification } = useNotificationContext();

  const onClickFirstNameHandler = async () => {
    const firstName = firstNameInputRef.current ? firstNameInputRef.current?.value : null;

    if (firstName) {
      await updateUserDocument(user, { firstName: firstName });

      swiper.slideNext();
    } else {
      setNotification({
        message: 'Your need to fill your name.',
        color: 'danger',
      });
    }
  }

  const onClickSecondNameHandler = async () => {
    const secondName = secondNameInputRef.current ? secondNameInputRef.current?.value : null;

    if (secondName) {
      await updateUserDocument(user, { secondName: secondName });

      swiper.slideNext();
    } else {
      setNotification({
        message: 'Your need to fill your second name.',
        color: 'danger',
      });
    }
  }

  const onClickSelectCuisinesHandler = async () => {
    if (selectedCuisines.length > 0) {
      await updateUserDocument(user, { favoriteCuisines: selectedCuisines });

      swiper.slideNext();
    } else {
      setNotification({
        message: 'Your need to fill your interests.',
        color: 'danger',
      });
    }
  }

  const savePicture = async (photo: CameraPhoto, fileName: string): Promise<PhotoInterface> => {
    let base64Data: string;

    // "hybrid" will detect Cordova or Capacitor;
    if (isPlatform('hybrid')) {
      const file = await readFile({
        path: photo.path!
      });
      base64Data = file.data;
    } else {
      base64Data = await base64FromPath(photo.webPath!);
    }
    const savedFile = await writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });

    if (isPlatform('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath
      };
    }
  };

  const onClickUploadPhotoHandler = async () => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const fileName = new Date().getTime() + '.jpeg';

    const savedFileImage = await savePicture(cameraPhoto, fileName);

    const newPhoto = {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
    };

    const newPhotos = [savedFileImage, ...photos];

    setPhotos(newPhotos);

    const base64Data = await base64FromPath(newPhoto.webviewPath!);

    set(PHOTO_STORAGE, JSON.stringify(newPhotos));

    uploadImage(base64Data, user.uid).then(
      function (result) {
        setPhotoUrl(result);
      },
      function (error) { console.log(error) }
    );
  };

  useEffect(() => {

    updateUserDocument(user, { photoURL: photoUrl });
  }, [photoUrl, user])

  return (
    <IonContent>
      <IonSlides pager={true} options={slideOpts} className="slider">
        <IonSlide className="slider__slide">
          <IonGrid>
            <IonRow className="slider__description">
              <IonCol>
                <IonText>What is your first name</IonText>
              </IonCol>
            </IonRow>
            <IonRow className="slider__input">
              <IonCol>
                <IonItem>
                  <IonLabel position="floating" color="primary">first name</IonLabel>
                  <IonInput className="input" ref={firstNameInputRef} clearInput></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="slider__button">
              <IonCol>
                <Button name="continue" onClickHandler={onClickFirstNameHandler} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonSlide>
        <IonSlide className="slider__slide">
          <IonGrid>
            <IonRow className="slider__description">
              <IonCol>
                <IonText>What is your second name</IonText>
              </IonCol>
            </IonRow>
            <IonRow className="slider__input">
              <IonCol>
                <IonItem>
                  <IonLabel position="floating" color="primary">second name</IonLabel>
                  <IonInput className="input" ref={secondNameInputRef} clearInput></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="slider__button">
              <IonCol>
                <Button name="continue" onClickHandler={onClickSecondNameHandler} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonSlide>
        <IonSlide className="slider__slide">
          <IonGrid>
            <IonRow className="slider__description">
              <IonCol>
                <IonText>What are your favorite cuisines?</IonText>
              </IonCol>
            </IonRow>
            <IonRow className="slider__input">
              <IonCol>
                <IonSelect multiple={true} cancelText="Cancel" placeholder="Select cuisines" okText="Confirm" onIonChange={(event) => setSelectedCuisines(event.detail.value)}>
                  <IonSelectOption value="italian">Italian</IonSelectOption>
                  <IonSelectOption value="greek">Greek</IonSelectOption>
                  <IonSelectOption value="thai">Thai</IonSelectOption>
                  <IonSelectOption value="bulgarian">Bulgarian</IonSelectOption>
                </IonSelect>
              </IonCol>
            </IonRow>
            <IonRow className="slider__button">
              <IonCol>
                <Button name="continue" onClickHandler={onClickSelectCuisinesHandler} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonSlide>
        <IonSlide className="slider__slide">
          <IonGrid>
            <IonRow className="slider__description">
              <IonCol>
                <IonText>Do you want to upload photo?</IonText>
              </IonCol>
            </IonRow>
            <IonRow className="slider__input">
              <IonCol>
                <IonAvatar className="slider__avatar">
                  <img className="slider__image" src={photoUrl} alt="user" />
                </IonAvatar>
                <Button name="choose photo" onClickHandler={onClickUploadPhotoHandler} />
              </IonCol>
            </IonRow>
            <IonRow className="slider__button">
              <IonCol>
                <Button name="continue" onClickHandler={() => history.push(urls.APP)} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonSlide>
      </IonSlides>
    </IonContent>
  );
};

export default OnboardingSlider;
