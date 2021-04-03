import React from "react";
import { IonToolbar, IonTitle, IonButtons, IonBackButton } from "@ionic/react";

import { pin } from 'ionicons/icons';
import "./Header.scss";

export type HeaderProps = {
  name: string;
  backButton?: boolean;
};

const Header = ({ name, backButton }: HeaderProps) => {
  return (
    <IonToolbar className="toolbar">
      <IonTitle className="ion-text-center toolbar__title">{name}</IonTitle>
      {backButton && (
        <IonButtons slot="start">
          <IonBackButton icon={pin} />
          // TODO: back button
        </IonButtons>
      )}
    </IonToolbar>
  );
};

export default Header;
