import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { auth, generateUserDocument } from "./services/firebase-service";

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import { UserContext } from "./UserContext";

import urls from "./config/urls";

import Loading from './pages/Loading/Loading';
import Login from './pages/Login/Login';
import Onboarding from './pages/Onbording/Onboarding';
import Tab from './Tab';

import './styles/App.scss';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';

export interface User {
  uid: string;
  email: string;
  photoUrl?: string
  displayName?: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);

      if (user?.uid) {
        setIsAuth(true);
        setUser(user);
      } else {
        setIsAuth(false);
      }
      setIsLoaded(true);
    });
  }, [isAuth]);

  return (
    <UserContext.Provider value={user}>
      <IonApp>
        {!isLoaded ? (
          <Loading />
        ) : (
            <IonReactRouter>
              <IonRouterOutlet>
                <Route path={urls.LOGIN} component={Login} exact={true} />
                <ProtectedRoute path={urls.ONBOARDING} component={Onboarding} isAuth={isAuth} />
                <Route exact path="/" render={() => {
                  if (isAuth) {
                    return <Redirect to={urls.ONBOARDING} />
                  } else {
                    return <Redirect to={urls.LOGIN} />
                  }
                }} />
              </IonRouterOutlet>
              <ProtectedRoute path="/app" component={Tab} isAuth={isAuth} />
            </IonReactRouter>
          )}
      </IonApp>
    </UserContext.Provider>
  );
}

export default App;
