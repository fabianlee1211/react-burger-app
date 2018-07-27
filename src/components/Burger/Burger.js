import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
  let transformedIngredient = Object.keys(props.ingredients)
    .map((igKey) => {
      // Create an array with the number of ingredients
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);
  // console.log(transformedIngredient);
  if(transformedIngredient.length === 0) {
    transformedIngredient = <p>Please start adding ingredients.</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredient}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;