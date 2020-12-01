import { IonPage, IonTitle, IonContent, IonGrid, IonRow, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import { addOutline, personCircle, peopleCircle, nutrition } from 'ionicons/icons';

import Home from './pages/Home/Home';
import Chiefs from './pages/Chiefs/Chiefs';
import Recipes from './pages/Recipes/Recipes';
import Account from './pages/Account/Account';

const Tab: React.FC = () => {
  return (
    <IonPage className="tab">
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonTitle className="tab-page__title">Home</IonTitle>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/app/home" component={Home} exact={true} />
          <Route path="/app/chiefs" component={Chiefs} />
          <Route path="/app/recipes" component={Recipes} />
          <Route path="/app/account" component={Account} />
          <Route path="/app" render={() => <Redirect to="/app/home" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/app/home">
            <IonIcon icon={nutrition} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="chiefs" href="/app/chiefs">
            <IonIcon icon={peopleCircle} />
            <IonLabel>Chiefs</IonLabel>
          </IonTabButton>
          <IonTabButton tab="recipes" href="/app/recipes">
            <IonIcon icon={addOutline} />
            <IonLabel>My recipes</IonLabel>
          </IonTabButton>
          <IonTabButton tab="account" href="/app/account">
            <IonIcon icon={personCircle} />
            <IonLabel>Account</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};

export default Tab;
