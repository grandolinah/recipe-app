import { IonToolbar, IonTitle } from '@ionic/react';
import React from 'react';

import './Toolbar.scss';

export interface ToolbarPropsInterface {
  name: string;
}

const Toolbar = ({ name }: ToolbarPropsInterface) => {
  return (
    <IonToolbar className="toolbar">
      <IonTitle className="ion-text-center toolbar__title">{name}</IonTitle>
    </IonToolbar>
  );
};

export default Toolbar;
