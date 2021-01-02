import { IonToolbar, IonTitle } from '@ionic/react';
import React from 'react';

import './Header.scss';

export type HeaderProps  = {
  name: string;
}

const Header = ({ name }: HeaderProps) => {
  return (
    <IonToolbar className="toolbar">
      <IonTitle className="ion-text-center toolbar__title">{name}</IonTitle>
    </IonToolbar>
  );
};

export default Header;
