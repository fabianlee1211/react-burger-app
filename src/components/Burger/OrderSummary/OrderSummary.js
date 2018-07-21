import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
  .map((igKey) => {
    return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
  })
  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>Delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <h3><strong>Total Price: {props.price.toFixed(2)}</strong></h3>
      <p>Continue to Checkout?</p>
      <Button clicked={props.purchaseCancel} btnType="Danger">CANCEL</Button>
      <Button clicked={props.purchaseContinue} btnType="Success">CONTINUE</Button>
    </React.Fragment>
  );
};

export default OrderSummary;