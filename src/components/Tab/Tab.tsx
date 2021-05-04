import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { addOutline, personCircle, peopleCircle, nutrition } from 'ionicons/icons';

import Home from '../../pages/Home/Home';
import Chiefs from '../../pages/Chiefs/Chiefs';
import Recipes from '../../pages/Recipes/Recipes';
import RecipeDetails from '../../pages/Recipes/RecipeDetails/RecipeDetails';
import Account from '../../pages/Account/Account';
import CreateRecipe from '../../pages/Recipes/CreateRecipe/CreateRecipe';

const Tab: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.log('pageview', location.pathname);
  }, [location]);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/app/home" component={Home} exact={true} />
        <Route path="/app/home/details/:id" component={RecipeDetails} exact={true} />
        <Route path="/app/chiefs" component={Chiefs} exact={true} />
        <Route path="/app/recipes" component={Recipes} exact={true} />
        <Route path="/app/recipes/create" component={CreateRecipe} exact={true} />
        <Route path="/app/account" component={Account} exact={true} />
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
  );
};

export default Tab;
