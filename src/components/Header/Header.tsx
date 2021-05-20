import React from 'react';
import { IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/react';

import { HeaderProps } from '../../interfaces/header-interface';

import './Header.scss';

const Header = ({ name, backButton }: HeaderProps) => {
  return (
    <IonToolbar className="toolbar">
      <IonTitle className="ion-text-center toolbar__title">{name}</IonTitle>
      {backButton && (
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
      )}
    </IonToolbar>
  );
};

export default Header;
