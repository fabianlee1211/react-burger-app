import React from 'react';
import Button from '../../UI/Button/Button';

const DeleteSummary = (props) => {
  const { 
    ingredients, 
    id, 
    price
  } = props.selectedOrder;
  const {
    deleteConfirm,
    deleteCancel
  } = props
  const ingredientSummary = Object.keys(ingredients)
      .map((igKey) => {
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {ingredients[igKey]}</li>
    })
  return (
    <div>
      <h3>Delete Order {id}</h3>
      <ul>
        {ingredientSummary}
      </ul>
      <h3><strong>Total Price: {price.toFixed(2)}</strong></h3>
      <p>Confirm to delete?</p>
      <Button clicked={deleteCancel} btnType="Danger">CANCEL</Button>
      <Button clicked={deleteConfirm} btnType="Success">CONTINUE</Button>
    </div>
  );
};

export default DeleteSummary;