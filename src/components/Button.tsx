import { IonButton, IonIcon } from '@ionic/react';
import React from 'react';

import './Button.scss';

import { ButtonPropsInterface } from '../interfaces/button-props-interface';

const Button = ({ onClickHandler, name, icon }: ButtonPropsInterface) => {
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
