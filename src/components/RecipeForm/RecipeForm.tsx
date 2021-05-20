import React, { useState, useContext, useEffect } from 'react';
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
} from '@ionic/react';
import { useLocation } from 'react-router';

import { Product, Recipe } from '../../interfaces/recipe-interface';
import usePhotoGallery from '../../hooks/usePhotoGallery';
import { UserContext } from '../../context/UserContext';
import { useNotificationContext } from '../../context/NotificationContext';
import Button from '../../components/Button/Button';
import { RecipeFormProps, StateType } from '../../interfaces/recipe-form-interface';

import './RecipeForm.scss';

const DEFAULT_STATE = {
  title: '',
  photoUrl: 'https://massageatworkusa.com/wp-content/uploads/2020/08/shutterstock_461827699.jpg',
  titleColor: 'primary',
  description: '',
  descriptionColor:'primary',
  step: '',
  stepColor: 'primary',
  product: '',
  productColor: 'primary',
  quantity: '',
  quantityColor: 'primary',
  steps: [],
  products: [],
};

const RecipeForm: React.FC<RecipeFormProps> = ({
  recipeIntro,
  stepDescription,
  productsDescription,
  onPressActionButton,
  actionButtonTitle
}) => {
  const [photoUrl, setPhotoUrl] = useState<string>(DEFAULT_STATE.photoUrl);
  const [title, setTitle] = useState<string>(DEFAULT_STATE.title);
  const [titleColor, setTitleColor] = useState<string>(DEFAULT_STATE.titleColor);
  const [description, setDescription] = useState<string>(DEFAULT_STATE.description);
  const [descriptionColor, setDescriptionColor] = useState<string>(DEFAULT_STATE.descriptionColor);
  const [step, setStep] = useState<string>(DEFAULT_STATE.step);
  const [stepColor, setStepColor] = useState<string>(DEFAULT_STATE.stepColor);
  const [steps, setSteps] = useState<any[]>(DEFAULT_STATE.steps);
  const [product, setProduct] = useState<string>(DEFAULT_STATE.product);
  const [productColor, setProductColor] = useState<string>(DEFAULT_STATE.productColor);
  const [quantity, setQuantity] = useState<string>(DEFAULT_STATE.quantity);
  const [quantityColor, setQuantityColor] = useState<string>(DEFAULT_STATE.quantityColor);
  const [products, setProducts] = useState<any[]>(DEFAULT_STATE.products);
  const user = useContext(UserContext);
  const { takePhoto } = usePhotoGallery();
  const { setNotification } = useNotificationContext();
  const [isRecipeSet, setIsRecipeSet] = useState<boolean>(false);
  const location = useLocation<StateType>();

  const resetInput = () => {
    setPhotoUrl(DEFAULT_STATE.photoUrl);
    setTitle(DEFAULT_STATE.title);
    setTitleColor(DEFAULT_STATE.titleColor);
    setDescription(DEFAULT_STATE.description);
    setDescriptionColor(DEFAULT_STATE.descriptionColor);
    setStep(DEFAULT_STATE.step);
    setStepColor(DEFAULT_STATE.stepColor);
    setProduct(DEFAULT_STATE.product);
    setProductColor(DEFAULT_STATE.productColor);
    setQuantity(DEFAULT_STATE.quantity);
    setQuantityColor(DEFAULT_STATE.quantityColor);
    setProducts(DEFAULT_STATE.products);
    setSteps(DEFAULT_STATE.steps);
  };

  const onClickUploadPhotoHandler = async () => {
    const base64Data = await takePhoto();

    setPhotoUrl(base64Data);
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
    if (step === '') {
      setNotification({
        message: 'Your need to fill step',
        color: 'danger',
      });
    } else {
      setSteps([...steps, step]);

      setStep(DEFAULT_STATE.step);
    }
  };

  const addProduct = () => {
    const notification = [];

    if (product === '' && quantity === '') {
      notification.push('product and quantity');
    } else if (product === '') {
      notification.push('product');
    } else if (quantity === '') {
      notification.push('quantity');
    }

    if (notification.length > 0) {
      setNotification({
        message: `Your need to fill ${notification.join(', ')}`,
        color: 'danger',
      });
    } else {
      setProducts([
        ...products,
        {
          item: product,
          quantity: quantity,
        },
      ]);

      setProduct(DEFAULT_STATE.product);
      setQuantity(DEFAULT_STATE.quantity);
    }
  };

  const validateInput = (data: Recipe) => {
    const notification = [];

    if (data.title === '') {
      setTitleColor('danger');
      notification.push('title');
    } else {
      setTitleColor('primary');
    }

    if (data.description === '') {
      setDescriptionColor('danger');
      notification.push('description');
    } else {
      setDescriptionColor('primary');
    }

    if (data.description === '') {
      setDescriptionColor('danger');
      notification.push('description');
    } else {
      setDescriptionColor('primary');
    }

    if (data.steps.length === 0) {
      setStepColor('danger');
      notification.push('steps');
    } else {
      setStepColor('primary');
    }

    if (data.products.length === 0) {
      setProductColor('danger');
      setQuantityColor('danger');
      notification.push('products');
    } else {
      setProductColor('primary');
      setQuantityColor('primary');
    }

    if (notification.length > 0) {
      setNotification({
        message: `Your need to fill ${notification.join(', ')}`,
        color: 'danger',
      });

      return false;
    }

    return true;
  };

  const addRecipe = () => {
    const newRecipe = {
      video: '',
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
      resetInput();

      onPressActionButton(newRecipe);
    }
  };

  useEffect(() => {
    if (!isRecipeSet && location.state) {
      setPhotoUrl(location.state.recipe.image ? location.state.recipe.image : photoUrl);
      setTitle(location.state.recipe.title ? location.state.recipe.title : title);
      setDescription(location.state.recipe.description ? location.state.recipe.description : description);
      setSteps(location.state.recipe.steps ? location.state.recipe.steps : steps);
      setProducts(location.state.recipe.products ? location.state.recipe.products : products);

      setIsRecipeSet(true);
    }
  }, [location, isRecipeSet]);

  return (
    <>
      <IonRow className="create-recipe__info">
        <IonText>
          {recipeIntro}
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
          {stepDescription}
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
        <IonText>{productsDescription}</IonText>
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
        <Button name={actionButtonTitle} onClickHandler={addRecipe} />
      </IonRow>
    </>
  );
};

export default RecipeForm;
