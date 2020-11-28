import { IonToolbar, IonTitle } from '@ionic/react';
import React from 'react';

import {ToolbarPropsInterface} from '../interfaces/toolbar-props.interface';

import './Toolbar.scss';

const Toolbar = ({ name }: ToolbarPropsInterface) => {
  return (
    <IonToolbar className="toolbar">
      <IonTitle className="ion-text-center toolbar__title">{name}</IonTitle>
    </IonToolbar>
  );
};

export default Toolbar;
