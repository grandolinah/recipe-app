import React, { useState, useEffect, useContext } from "react";
import { RouteComponentProps } from "react-router";
import {
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonCol,
  IonText,
  IonInput,
  IonLabel,
  IonImg,
  IonTextarea,
  IonList,
  IonItem,
  IonTitle,
  IonAvatar,
} from "@ionic/react";

import { uploadImage } from "../../services/firebase-service";

import { usePhotoGallery } from "../../hooks/usePhotoGallery";

import { UserContext } from "../../context/UserContext";
import { useNotificationContext } from "../../context/NotificationContext";

import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";

import "./CreateRecipe.scss";

interface Product {
  item: string;
  quantity: string;
}

interface Recipe {
  id?: string;
  video?: string;
  image?: string;
  title: string;
  userId?: string;
  description: string;
  steps: string[];
  products: Product[];
}

const CreateRecipe: React.FC<RouteComponentProps> = ({ match, history }) => {
  const user = useContext(UserContext);
  const { takePhoto } = usePhotoGallery();
  const { setNotification } = useNotificationContext();

  const [photoUrl, setPhotoUrl] = useState<string>(
    "https://massageatworkusa.com/wp-content/uploads/2020/08/shutterstock_461827699.jpg"
  );
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [step, setStep] = useState<string | null>(null);
  const [steps, setSteps] = useState<any>([]);
  const [product, setProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);

  // TODO: clear input after add step or product

  const onClickUploadPhotoHandler = async () => {
    const base64Data = await takePhoto();
    // TODO: save image or video
  };

  const removeProduct = (item: string) => {
    const removedList = products.filter((product) => product.item !== item);

    setProducts(removedList);
  };

  const removeStep = (index: number) => {
    const removedList = steps.splice(index, 1);
    // TODO: delete the item from the list
    setSteps(removedList);
  };

  const addRecipe = () => {
    const newRecipe = {
      video: "",
      image: photoUrl,
      title,
      userId: user.uid,
      description,
      steps,
      products,
    };

    // TODO: save recipe to firebase
  };

  console.log(steps);

  return (
    <IonPage>
      <Header name="New recipe" backButton />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonText>Add new recipe</IonText>
          </IonRow>
          <IonRow>
            <IonRow className="account__avatar-box ion-align-items-center ion-justify-content-center">
              <IonCol>
                <IonAvatar className="account__avatar">
                  <img className="account__image" src={photoUrl} alt="user" />
                </IonAvatar>
              </IonCol>
              <IonCol>
                <Button
                  name="change"
                  onClickHandler={onClickUploadPhotoHandler}
                />
              </IonCol>
            </IonRow>
          </IonRow>
          <IonRow>
            <IonItem>
              <IonLabel position="floating" color="primary">
                title
              </IonLabel>
              <IonInput
                className="input"
                value={title}
                clearInput
                onIonChange={(e) => setTitle(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonRow>
          <IonRow>
            <IonItem>
              <IonLabel position="floating" color="primary">
                description
              </IonLabel>
              <IonTextarea
                value={description}
                onIonChange={(e) => setDescription(e.detail.value!)}
              ></IonTextarea>
            </IonItem>
          </IonRow>
          <IonRow>
            <IonTitle>Steps:</IonTitle>
            <IonList>
              {steps.map((item: string, index: number) => (
                <IonItem key={index}>
                  <IonText>
                    {index + 1}. {item}
                  </IonText>
                  <Button name="x" onClickHandler={() => removeStep(index)} />
                </IonItem>
              ))}
            </IonList>
          </IonRow>
          <IonRow>
            <IonItem>
              <IonLabel position="floating" color="primary">
                step
              </IonLabel>
              <IonInput
                className="input"
                value={step}
                onIonChange={(e) => setStep(e.detail.value!)}
                clearInput
              ></IonInput>
              <Button
                name="+"
                onClickHandler={() => setSteps([...steps, step])}
              />
            </IonItem>
          </IonRow>
          <IonRow>
            <IonTitle>Products</IonTitle>
          </IonRow>
          <IonRow>
            <IonList>
              {products.map((item: Product, index: number) => (
                <IonItem key={index}>
                  <IonText>
                    {index + 1}. {item.item} - {item.quantity}
                  </IonText>
                  <Button
                    name="x"
                    onClickHandler={() => removeProduct(item.item)}
                  />
                </IonItem>
              ))}
            </IonList>
          </IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating" color="primary">
                Product
              </IonLabel>
              <IonInput
                className="input"
                value={product}
                clearInput
                onIonChange={(e) => setProduct(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="floating" color="primary">
                Quantity
              </IonLabel>
              <IonInput
                className="input"
                value={quantity}
                clearInput
                onIonChange={(e) => setQuantity(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonCol>
          <Button
            name="+"
            onClickHandler={() =>
              setProducts([
                ...products,
                {
                  item: product,
                  quantity: quantity,
                },
              ])
            }
          />
        </IonGrid>
        <Button name="Add recipe" onClickHandler={addRecipe} />
      </IonContent>
    </IonPage>
  );
};

export default CreateRecipe;
