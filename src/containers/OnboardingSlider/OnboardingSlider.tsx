import React, { useRef, useContext, useState } from 'react';
import { IonSlides, IonSlide, IonContent, IonGrid, IonCol, IonRow, IonInput, IonItem, IonLabel, IonTitle, IonSelect, IonSelectOption, IonAvatar } from '@ionic/react';
import { UserContext } from "../../UserContext";
import Button from '../../components/Button/Button';
import { updateUserDocument } from '../../services/firebase-service';
import './OnboardingSlider.scss';

// import CUISINES from '../config/cuisine';
let swiper: any;

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 0,
  speed: 400,
  // allowTouchMove: false,
  pagination: false,
  on: {
    beforeInit() {
      swiper = this;
    },
  }
};

const OnboardingSlider: React.FC = () => {
  const firstNameInputRef = useRef<HTMLIonInputElement>(null);
  const secondNameInputRef = useRef<HTMLIonInputElement>(null);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [photoUrl, setPhotoUrl] = useState('https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y')
  const user = useContext(UserContext);

  console.log(user);
  console.log(selectedCuisines);

  const onClickFirstNameHandler = async () => {
    const firstName = firstNameInputRef.current ? firstNameInputRef.current?.value : null;

    if (firstName) {
      await updateUserDocument(user, { firstName: firstName });

      swiper.slideNext();
    }
  }

  const onClickSecondNameHandler = async () => {
    const secondName = secondNameInputRef.current ? secondNameInputRef.current?.value : null;

    if (secondName) {
      await updateUserDocument(user, { secondName: secondName });

      swiper.slideNext();
    }
  }

  const onClickSelectCuisinesHandler = async () => {
    if (selectedCuisines.length > 0) {
      await updateUserDocument(user, { favoriteCuisines: selectedCuisines });

      swiper.slideNext();
    }
  }

  // const cuisineSelectOptions = () => {
  //   const selectOptions = CUISINES.map((item: string) => {
  //     return (
  //       <IonSelectOption value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</IonSelectOption>
  //     );
  //   });

  //   return (
  //     <IonSelect multiple={true} cancelText="Cancel" okText="Confirm" onIonChange={(e) => console.log(e)}>{selectOptions}</IonSelect>
  //   )
  // }

  const onClickUploadPhotoHandler = () => {};

  const onClickPhotoHandler = () => {};

  return (
    <IonContent>
      <IonSlides pager={true} options={slideOpts} className="slider">
        <IonSlide className="slider__slide">
          <IonGrid>
            <IonRow className="slider__description">
              <IonCol>
                <IonTitle>What is your first name</IonTitle>
              </IonCol>
            </IonRow>
            <IonRow className="slider__input">
              <IonCol>
                <IonItem>
                  <IonLabel position="floating" color="primary">first name</IonLabel>
                  <IonInput className="input" ref={firstNameInputRef} clearInput></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="slider__button">
              <IonCol>
                <Button name="continue" onClickHandler={onClickFirstNameHandler} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonSlide>
        <IonSlide className="slider__slide">
          <IonGrid>
            <IonRow className="slider__description">
              <IonCol>
                <IonTitle>What is your second name</IonTitle>
              </IonCol>
            </IonRow>
            <IonRow className="slider__input">
              <IonCol>
                <IonItem>
                  <IonLabel position="floating" color="primary">second name</IonLabel>
                  <IonInput className="input" ref={secondNameInputRef} clearInput></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="slider__button">
              <IonCol>
                <Button name="continue" onClickHandler={onClickSecondNameHandler} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonSlide>
        <IonSlide className="slider__slide">
          <IonGrid>
            <IonRow className="slider__description">
              <IonCol>
                <IonTitle>What are your favorite cuisines?</IonTitle>
              </IonCol>
            </IonRow>
            <IonRow className="slider__input">
              <IonCol>
                <IonSelect multiple={true} cancelText="Cancel" placeholder="Select cuisines" okText="Confirm" onIonChange={(event) => setSelectedCuisines(event.detail.value)}>
                  <IonSelectOption value="italian">Italian</IonSelectOption>
                  <IonSelectOption value="greek">Greek</IonSelectOption>
                  <IonSelectOption value="thai">Thai</IonSelectOption>
                  <IonSelectOption value="bulgarian">Bulgarian</IonSelectOption>
                </IonSelect>
              </IonCol>
            </IonRow>
            <IonRow className="slider__button">
              <IonCol>
                <Button name="continue" onClickHandler={onClickSelectCuisinesHandler} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonSlide>

        <IonSlide className="slider__slide">
          <IonGrid>
            <IonRow className="slider__description">
              <IonCol>
                <IonTitle>Do you want to upload photo?</IonTitle>
              </IonCol>
            </IonRow>
            <IonRow className="slider__input">
              <IonCol>
                <IonAvatar>
                  <img src={photoUrl} alt="user" />
                </IonAvatar>
              </IonCol>
              <IonCol>
                <Button name="upload" onClickHandler={onClickUploadPhotoHandler} />
              </IonCol>
            </IonRow>
            <IonRow className="slider__button">
              <IonCol>
                <Button name="continue" onClickHandler={onClickPhotoHandler} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonSlide>
      </IonSlides>
    </IonContent>
  )
}

export default OnboardingSlider;
