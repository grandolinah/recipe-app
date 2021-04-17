import React, { useState, useEffect, useContext } from "react";
import { RouteComponentProps } from "react-router";
import {
  IonItemDivider,
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

import { uploadImage } from "../../../services/firebase-service";

import { usePhotoGallery } from "../../../hooks/usePhotoGallery";

import { UserContext } from "../../../context/UserContext";
import { useNotificationContext } from "../../../context/NotificationContext";

import PageLayout from "../../../layouts/PageLayout";
import Button from "../../../components/Button/Button";

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

  const addStep = () => {
    setSteps([...steps, step]);

    setStep('');
  };


  const addProduct = () => {
    setProducts([
      ...products,
      {
        item: product,
        quantity: quantity,
      },
    ]);

    setProduct('');
    setQuantity('');
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
    console.log(newRecipe);
  };

  console.log(steps);

  return (
    <PageLayout name="New recipe" backButton className="create-recipe">
      <IonRow className="create-recipe__info">
        <IonText>
          Add new recipe here, all you need to add is steps, products and some
          extra info..
        </IonText>
      </IonRow>
      <IonItemDivider>
        <IonRow className="account__avatar-box ion-align-items-center ion-justify-content-center">
          <IonCol>
            <IonAvatar className="account__avatar">
              <img className="account__image" src={photoUrl} alt="user" />
            </IonAvatar>
          </IonCol>
          <IonCol>
            <Button name="change" onClickHandler={onClickUploadPhotoHandler} />
          </IonCol>
        </IonRow>
      </IonItemDivider>

      <IonItemDivider>
        <IonRow>
          <IonItem className="create-recipe__input">
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
      </IonItemDivider>

      <IonItemDivider>
        <IonRow>
          <IonItem className="create-recipe__input">
            <IonLabel position="floating" color="primary">
              description
            </IonLabel>
            <IonTextarea
              className="create-recipe__description"
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
        </IonRow>
      </IonItemDivider>

      <IonRow className="create-recipe__info">
        <IonText>
          Help your followers with step by step recipe, add steps bellow:
        </IonText>
      </IonRow>
      <IonRow>
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
      <IonItemDivider>
        <IonRow>
          <IonCol size="10">
            <IonItem className="create-recipe__input">
              <IonLabel position="floating" color="primary">
                step
              </IonLabel>
              <IonInput
                className="input"
                value={step}
                onIonChange={(e) => setStep(e.detail.value!)}
                clearInput
              ></IonInput>
            </IonItem>
          </IonCol>
          <IonCol size="2">
            <Button
              name="+"
              onClickHandler={addStep}
            />
          </IonCol>
        </IonRow>
      </IonItemDivider>

      <IonRow className="create-recipe__info">
        <IonText>Now its time to make a list with the products:</IonText>
      </IonRow>
      <IonRow>
        <IonList>
          {products.map((item: Product, index: number) => (
            <IonItem key={index}>
              <IonText>
                {index + 1}. {item.item} - {item.quantity}
              </IonText>
              <Button
                name="X"
                onClickHandler={() => removeProduct(item.item)}
              />
            </IonItem>
          ))}
        </IonList>
      </IonRow>

      <IonRow>
        <IonItemDivider>
          <IonCol size="7">
            <IonItem className="create-recipe__input">
              <IonLabel position="floating" color="primary">
                product
              </IonLabel>
              <IonInput
                className="input"
                value={product}
                clearInput
                onIonChange={(e) => setProduct(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonCol>
          <IonCol size="3">
            <IonItem className="create-recipe__input">
              <IonLabel position="floating" color="primary">
                qty
              </IonLabel>
              <IonInput
                className="input"
                value={quantity}
                clearInput
                onIonChange={(e) => setQuantity(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonCol>
          <IonCol size="2">
            <Button
              name="+"
              onClickHandler={addProduct}
            />
        </IonCol>
        </IonItemDivider>
      </IonRow>
      <IonRow className="create-recipe__create-button">
        <Button name="Add recipe" onClickHandler={addRecipe} />
      </IonRow>
    </PageLayout>
  );
};

export default CreateRecipe;
