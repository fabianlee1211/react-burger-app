import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as actions from '../../store/actions';

export const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, []);

  const updatePurchaseState = ingredients => {
    // Async process might use wrong state!!!
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchasedCancelHandler = () => {
    setPurchasing(false);
  };

  const purchasedContinueHandler = () => {
    props.history.push('/checkout');
    props.onInitPurchase();
    // const queryParams = [];
    // for (const i in props.ingredients) {
    // 	queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(props.ingredients[i])}`);
    // }
    // queryParams.push(`price=${totalPrice}`);
    // const queryString = queryParams.join('&');
    // props.history.push({
    // 	pathname: '/checkout',
    // 	search: `?${queryString}`,
    // });
  };

  const disabledInfo = {
    ...props.ingredients
  };
  // {salad: true, meat: false...}
  for (const key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;
  let burger = props.error ? <p>Can't find ingredients!</p> : <Spinner />;
  // Check if we need fetch the ingredients from API
  if (props.ingredients) {
    burger = (
      <React.Fragment>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          price={props.totalPrice}
          ingredientAdded={props.onAddIngredient}
          ingredientRemoved={props.onRemoveIngredient}
          purchasable={updatePurchaseState(props.ingredients)}
          disabled={disabledInfo}
          ordered={purchaseHandler}
          isAuth={props.isAuthenticated}
        />
      </React.Fragment>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ingredients}
        purchaseCancel={purchasedCancelHandler}
        purchaseContinue={purchasedContinueHandler}
        price={props.totalPrice}
      />
    );
  }

  return (
    <React.Fragment>
      <Modal show={purchasing} modalClosed={purchasedCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ig => dispatch(actions.addIngredient(ig)),
    onRemoveIngredient: ig => dispatch(actions.removeIngredient(ig)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
