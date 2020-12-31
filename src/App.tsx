import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonAlert } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { auth, generateUserDocument, getUserDocument } from "./services/firebase-service";

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
  email?: string;
  photoUrl?: string
  displayName?: string;
  firstName?: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [isAuth, setIsAuth] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  console.log(user);
  console.log(isAuth);
  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);

      if (user?.uid) {
        setIsAuth(true);
        setUser(user);
        setShowAlert(true);

        const userDocument = await getUserDocument(user?.uid);

        if (userDocument?.hasOwnProperty('firstName')) {
          Object.entries(userDocument).forEach(([key, value]) => {
            if (key === 'firstName' && value !== '') {
              setIsOnboarded(true);
            }
          });
        }
      } else {
        setIsAuth(false);
      }

      setIsLoaded(true);
    });
  }, [isAuth]);

  return (
    <UserContext.Provider value={user}>
      <IonApp>
        <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            cssClass='my-custom-class'
            header={'Alert'}
            subHeader={'Subtitle'}
            message={`This is an alert message.${user?.uid} , ${isAuth}`}
            buttons={['OK']}
          />
        {!isLoaded ? (
          <Loading />
        ) : (
            <IonReactRouter>
              {isAuth ? (
                <IonRouterOutlet>
                  <ProtectedRoute path={urls.ONBOARDING} component={Onboarding} isAuth={isAuth} />
                  <ProtectedRoute path="/app" component={Tab} isAuth={isAuth} />
                  <Route exact path="/" render={() => {
                    if (isAuth && !isOnboarded) {
                      return <Redirect to={urls.ONBOARDING} />
                    } else if (isAuth && isOnboarded){
                      return <Redirect to={urls.APP} />
                    }
                  }} />
                  <Route exact path="/login" render={() => {
                    if (!isOnboarded) {
                      return <Redirect to={urls.ONBOARDING} />
                    } else {
                      return <Redirect to={urls.APP} />
                    }
                  }} />
                </IonRouterOutlet>
              ) : (
                <IonRouterOutlet>
                  <Route path={urls.LOGIN} component={Login} exact={true} />
                  <Route exact path="/" render={() => {
                    return <Redirect to={urls.LOGIN} />
                  }} />
                </IonRouterOutlet>
              )}
            </IonReactRouter>
          )}
      </IonApp>
    </UserContext.Provider>
  );
}

export default App;
