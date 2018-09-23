import React from 'react';
import Button from '../UI/Button/Button';
import classes from './Order.css';

const Order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName, 
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredients.map((ig) => {
    return <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #eee',
        padding: '5px'
      }} 
      key={ig.name}>{ig.name} ({ig.amount})</span>
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD ${props.price.toFixed(2)}</strong></p>
      <Button btnType="Danger" clicked={props.clicked}>DELETE</Button>
    </div>
  );
};

export default Order;