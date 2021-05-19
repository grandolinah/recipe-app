import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';

import { ButtonProps } from '../../interfaces/button-interface';

import './Button.scss';

const Button = ({ onClickHandler, name, icon }: ButtonProps) => {
  return (
    <IonButton onClick={onClickHandler} className="button" shape="round">
      {name}
      {icon ? (
        <IonIcon icon={icon}></IonIcon>
      ) : null}
    </IonButton>
  );
};

export default Button;
