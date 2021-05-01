import React, { useState, useContext } from "react";
import { RouteComponentProps } from "react-router";
import {
  IonItemDivider,
  IonRow,
  IonCol,
  IonText,
  IonInput,
  IonLabel,
  IonTextarea,
  IonList,
  IonItem,
  IonAvatar,
} from "@ionic/react";

import { usePhotoGallery } from "../../../hooks/usePhotoGallery";

import { UserContext } from "../../../context/UserContext";
import { useNotificationContext } from "../../../context/NotificationContext";

import PageLayout from "../../../layouts/PageLayout";
import Button from "../../../components/Button/Button";

import { createRecipe } from '../../../services/firebase-service';

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
  userId: string;
  userName?: string;
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
  const [titleColor, setTitleColor] = useState<string>("primary");
  const [description, setDescription] = useState<string>("");
  const [descriptionColor, setDescriptionColor] = useState<string>("primary");
  const [step, setStep] = useState<string>();
  const [stepColor, setStepColor] = useState<string>("primary");
  const [steps, setSteps] = useState<any>([]);
  const [product, setProduct] = useState<string>("");
  const [productColor, setProductColor] = useState<string>("primary");
  const [quantity, setQuantity] = useState<string>("");
  const [quantityColor, setQuantityColor] = useState<string>("primary");
  const [products, setProducts] = useState<any[]>([]);

  // TODO: clear input after add step or product

  const onClickUploadPhotoHandler = async () => {
    const base64Data = await takePhoto();

    setPhotoUrl(base64Data)
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
    if (step === "") {
      setNotification({
        message: "Your need to fill step",
        color: "danger",
      });
    } else {
      setSteps([...steps, step]);

      setStep("");
    }
  };

  const addProduct = () => {
    const notification = [];
    if (product === "" && quantity === "") {
      notification.push("product and quantity");
    } else if (product === "") {
      notification.push("product");
    } else if (quantity === "") {
      notification.push("quantity");
    }

    if (notification.length > 0) {
      setNotification({
        message: `Your need to fill ${notification.join(", ")}`,
        color: "danger",
      });
    } else {
      setProducts([
        ...products,
        {
          item: product,
          quantity: quantity,
        },
      ]);

      setProduct("");
      setQuantity("");
    }
  };

  const validateInput = (data: Recipe) => {
    const notification = [];

    if (data.title === "") {
      setTitleColor("danger");
      notification.push("title");
    } else {
      setTitleColor("primary");
    }

    if (data.description === "") {
      setDescriptionColor("danger");
      notification.push("description");
    } else {
      setDescriptionColor("primary");
    }

    if (data.description === "") {
      setDescriptionColor("danger");
      notification.push("description");
    } else {
      setDescriptionColor("primary");
    }

    if (data.steps.length === 0) {
      setStepColor("danger");
      notification.push("steps");
    } else {
      setStepColor("primary");
    }

    if (data.products.length === 0) {
      setProductColor("danger");
      setQuantityColor("danger");
      notification.push("products");
    } else {
      setProductColor("primary");
      setQuantityColor("primary");
    }

    if (notification.length > 0) {
      setNotification({
        message: `Your need to fill ${notification.join(", ")}`,
        color: "danger",
      });

      return false;
    }

    return true;
  };

  const addRecipe = () => {
    const newRecipe = {
      video: "",
      image: photoUrl,
      title,
      userId: user.uid,
      userName : `${user.firstName} ${user.secondName}`,
      description,
      steps,
      products,
    };

    const isInputValidated = validateInput(newRecipe);

    if (isInputValidated) {
      createRecipe(newRecipe);

      console.log(newRecipe);

      // TODO: reset inputs
      history.push('/app/recipes');
    }
  };

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
            <IonLabel position="floating" color={titleColor}>
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
            <IonLabel position="floating" color={descriptionColor}>
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
          <IonCol size="8">
            <IonItem className="create-recipe__input">
              <IonLabel position="floating" color={stepColor}>
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
          <IonCol size="4">
            <Button name="+" onClickHandler={addStep} />
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
                {item.item} - {item.quantity}
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
          <IonRow>
            <IonCol size="8">
              <IonItem className="create-recipe__input">
                <IonLabel position="floating" color={productColor}>
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
            <IonCol size="4">
              <IonItem className="create-recipe__input">
                <IonLabel position="floating" color={quantityColor}>
                  qty
                </IonLabel>
                <IonInput
                  className="input"
                  value={quantity}
                  onIonChange={(e) => setQuantity(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <Button name="add" onClickHandler={addProduct} />
        </IonItemDivider>
      </IonRow>
      <IonRow className="create-recipe__create-button">
        <Button name="Add recipe" onClickHandler={addRecipe} />
      </IonRow>
    </PageLayout>
  );
};

export default CreateRecipe;
