import { IonButton, IonIcon } from '@ionic/react';
import React from 'react';

import './Button.scss';

export type ButtonProps = {
  name: string;
  onClickHandler(): void;
  icon?: string;
}

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
