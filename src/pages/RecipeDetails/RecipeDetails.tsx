import React from 'react';
import { IonContent, IonGrid, IonPage, IonRow, IonImg, IonItem, IonIcon, IonTitle } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { pin } from 'ionicons/icons';


interface RecipeDetailsProps extends RouteComponentProps <{
  id: string;
}> {}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({match, history}) => {
  const { id } = match.params;

  // TODO: get data by id in the database
  // console.log(id);

  const title = '';
  const author = '';
  const image = '';
  const description = '';
  const products = [''];
  const steps = [''];

  return (
    <IonPage>
      <IonContent>
        {id}
        <IonGrid>
          <IonRow>
            <IonTitle>{title}</IonTitle>
            <IonTitle size="small">by {author}</IonTitle>
          </IonRow>
          <IonRow>
            <IonImg src={image} />
          </IonRow>
          <IonRow>
            Products:
          {/* {products.map((product: any) => {
            return (
              <IonItem className="ion-activated">
                <IonIcon icon={pin} slot="start" />
                {product.item} - {product.quantity}
              </IonItem>
            )
          })} */}
          </IonRow>
          <IonRow>
            {description}
            {/* {steps.map((step: string, index: number) => {
              return (
                <IonItem className="ion-activated">
                  <IonIcon icon={pin} slot="start" />
                  {index + 1}. {step}
                </IonItem>
              )
            })} */}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RecipeDetails;
