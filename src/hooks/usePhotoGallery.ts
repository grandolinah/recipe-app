import React, { useState } from 'react';
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory } from '@capacitor/core';

const PHOTO_STORAGE = 'photos';

export interface Photo {
  filepath: string;
  webviewPath?: string;
}

export interface PhotoInterface {
  filepath: string;
  webviewPath?: string;
}

const usePhotoGallery = () => {
  const { getPhoto } = useCamera();
  const { set } = useStorage();
  const { readFile, writeFile } = useFilesystem();
  const [photos, setPhotos] = useState<any[]>([]);

  const takePhoto = async () => {
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

    return base64Data;
  };

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

  return {
    takePhoto,
    savePicture,
  };
};

export default usePhotoGallery;