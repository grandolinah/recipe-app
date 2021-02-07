import React, { useState, useContext, useEffect } from 'react';
import { IonPage, IonAvatar, IonContent, IonGrid, IonRow, IonCol, IonItem, IonInput, IonSelect, IonSelectOption, IonItemDivider } from '@ionic/react';
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory } from '@capacitor/core';

import { updateUserDocument, uploadImage } from '../../services/firebase-service';

import { UserContext } from '../../context/UserContext';
import { useNotificationContext } from '../../context/NotificationContext';

import Button from '../../components/Button/Button';

import './Account.scss';

const PHOTO_STORAGE = 'photos';

export interface Photo {
  filepath: string;
  webviewPath?: string;
}

export interface PhotoInterface {
  filepath: string;
  webviewPath?: string;
}

const Account: React.FC = () => {
  const user = useContext(UserContext);
  const [photoUrl, setPhotoUrl] = useState<any>(user?.photoURL ? user.photoURL
    : 'https://firebasestorage.googleapis.com/v0/b/ionic-recipes-6daa6.appspot.com/o/users%2Fdefault-user-image.png?alt=media&token=7963c406-089f-444e-9262-f22b1524fe45');
  const { set } = useStorage();
  const { getPhoto } = useCamera();
  const { readFile, writeFile } = useFilesystem();
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [secondName, setSecondName] = useState<string>(user.secondName);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(user.favoriteCuisines);
  const [photos, setPhotos] = useState<any[]>([]);
  const { notification, setNotification } = useNotificationContext();

  console.log(user);
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

  const onPressUpdateHandler = async () => {
    // check if there is change
    const isInfoUpdated = firstName !== user.firstName || secondName !== user.secondName || selectedCuisines !== user.favoriteCousines;
    console.log(isInfoUpdated);
    if (isInfoUpdated) {
      const updatedInfo = {
        firstName,
        secondName,
        favoriteCuisines: selectedCuisines,
      }

      console.log(updatedInfo);

      // update changes
      try {
        await updateUserDocument(user, updatedInfo);

        setNotification({
          message: 'Changes have been saved.',
          color: 'primary',
        });
      } catch(error) {
        setNotification({
          message: 'Changes have not been saved. Please try again.',
          color: 'danger',
        });
      }
    }
  };

  useEffect(() => {
    updateUserDocument(user, { photoURL: photoUrl });
  }, [photoUrl, user])

  return (
    <IonPage className="account">
      <IonContent>
        <IonGrid className="account__grid">
          <IonRow className="account__avatar-box ion-align-items-center ion-justify-content-center">
            <IonCol>
              <IonAvatar className="account__avatar">
                <img className="account__image" src={photoUrl} alt="user" />
              </IonAvatar>
            </IonCol>
            <IonCol>
              <Button name="update photo" onClickHandler={onClickUploadPhotoHandler} />
            </IonCol>
          </IonRow>
          <IonItemDivider>First Name</IonItemDivider>
          <IonRow className="account__input-box">
            <IonCol>
              <IonItem>
                <IonInput className="account__input" value={firstName} onIonChange={e => setFirstName(e.detail.value!)}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonItemDivider>Surname</IonItemDivider>
          <IonRow className="account__input-box">
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
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Account;
