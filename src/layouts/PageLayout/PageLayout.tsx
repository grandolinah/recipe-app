import React, { ReactNode } from "react";
import { IonPage, IonContent, IonGrid } from "@ionic/react";
import Header from "../../components/Header";

import "./PageLayout.scss";

type PageLayoutProps = {
  name: string;
  className?: string;
  center?: boolean;
  backButton?: boolean;
  children?: ReactNode;
};

const PageLayout = ({
  children,
  className,
  name,
  center,
  backButton,
}: PageLayoutProps) => {
  return (
    <IonPage className={`page ${className ? className : ""}`}>
      <Header name={name} backButton={backButton} />
      <IonContent className={`page__content `}>
        <IonGrid className={`${center ? "page__center" : ""}`}>
          {children}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PageLayout;
