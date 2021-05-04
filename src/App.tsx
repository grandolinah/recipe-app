import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonToast } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { auth, generateUserDocument, getUserDocument } from './services/firebase-service';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import { UserContext } from './context/UserContext';
import { NotificationContext } from './context/NotificationContext';

import urls from './config/urls';

import Loading from './pages/Loading/Loading';
import Login from './pages/Login/Login';
import Onboarding from './pages/Onbording/Onboarding';
import Tab from './components/Tab/Tab';

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

import './styles/App.scss';

export interface UserInterface {
  uid: string;
  email?: string;
  photoUrl?: string
  displayName?: string;
  firstName?: string;
}

export interface NotificationInterface {
  message: string;
  color: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<UserInterface>();
  const [notification, setNotification] = useState<any>();

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);

  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);

      if (user) {
        setUser(user);

        const userDocument = await getUserDocument(user?.uid);

        if (userDocument?.hasOwnProperty('firstName')) {
          Object.entries(userDocument).forEach(([key, value]) => {
            if (key === 'firstName' && value !== '') {
              setIsOnboarded(true);
            }
          });
        }

        setIsAuth(true);
      } else {
        setIsAuth(false);
        setUser(undefined);
      }

      setIsLoaded(true);

      return () => {
        unlisten();
      }
    });
  }, [isAuth]);

  useEffect(() => {
    if (notification?.message !== '') {
      setIsToastVisible(true);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      <UserContext.Provider value={user}>
        <IonApp>
          {isToastVisible && notification?.message !== '' && notification?.color ? (
            <IonToast
              isOpen={isToastVisible}
              onDidDismiss={(): any => {
                setNotification({ message: '', color: 'primary' })
              }}
              message={notification.message}
              duration={2000}
              color={notification.color}
              position="middle"
            />
          ) : null}

          {!isLoaded ? (
            <Loading />
          ) : (
            <IonReactRouter>
              {isAuth ? (
                <IonRouterOutlet>
                  <ProtectedRoute path={urls.ONBOARDING} component={Onboarding} isAuth={isAuth} />
                  <ProtectedRoute path={urls.APP} component={Tab} isAuth={isAuth} />
                  <Route exact path="/" render={() => {
                    if (isAuth && !isOnboarded) {
                      return <Redirect to={urls.ONBOARDING} />
                    } else if (isAuth && isOnboarded) {
                      return <Redirect to={urls.APP} />
                    }
                  }} />
                  <Route exact path={urls.LOGIN} render={() => {
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
    </NotificationContext.Provider>
  );
};

export default App;
