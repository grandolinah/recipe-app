import { IonItem, IonLabel, IonInput } from '@ionic/react';
import React from 'react';

import './Input.scss';

export type InputProps = {
  labelColor: string;
  labelText: string;
  ref: any;
}

const InputItem = ({ labelColor, labelText, ref }: InputProps) => {
  return (
    <IonItem>
      <IonLabel position="floating" color={labelColor}>{labelText}</IonLabel>
      <IonInput className="input" ref={ref} clearInput></IonInput>
    </IonItem>
  );
};

export default InputItem;
