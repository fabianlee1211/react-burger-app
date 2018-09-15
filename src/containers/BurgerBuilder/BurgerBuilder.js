import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as burgerBuilderActions from '../../store/actions';

class BurgerBuilder extends Component {
	// Keep only the UI state if possible
  state = {
    purchasing: false,
  }

  componentDidMount() {
		this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
  	// Async process might use wrong state!!!
  	const sum = Object.keys(ingredients)
  		.map(igKey => ingredients[igKey])
  		.reduce((sum, el) => sum + el, 0);
  	return sum > 0 
  }

  purchaseHandler = () => {
  	this.setState({ purchasing: true });
  }

  purchasedCancelHandler = () => {
  	this.setState({ purchasing: false });
  }

  purchasedContinueHandler = () => {
		this.props.history.push('/checkout');
  	// const queryParams = [];
  	// for (const i in this.props.ingredients) {
  	// 	queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.props.ingredients[i])}`);
  	// }
  	// queryParams.push(`price=${this.state.totalPrice}`);
  	// const queryString = queryParams.join('&');
  	// this.props.history.push({
  	// 	pathname: '/checkout',
  	// 	search: `?${queryString}`,
  	// });
  }

  // addIngredientHandler = (type) => {
  // 	const oldCount = this.props.ingredients[type];
  // 	const updatedCount = oldCount + 1;
  // 	const updatedIngredients = {
  // 		...this.props.ingredients,
  // 	};
  // 	updatedIngredients[type] = updatedCount;
  // 	const priceAddition = INGREDIENT_PRICES[type];
  // 	const oldPrice = this.state.totalPrice;
  // 	const newPrice = oldPrice + priceAddition;
  // 	this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  // 	this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  // 	const oldCount = this.props.ingredients[type];
  // 	if (oldCount > 0) {
  // 		const updatedCount = oldCount - 1;
  // 		const updatedIngredients = {
  // 			...this.props.ingredients,
  // 		};
  // 		updatedIngredients[type] = updatedCount;
  // 		const priceAddition = INGREDIENT_PRICES[type];
  // 		const oldPrice = this.state.totalPrice;
  // 		const newPrice = oldPrice - priceAddition;
  // 		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  // 		this.updatePurchaseState(updatedIngredients);
  // 	}
  // }

  render() {
  	const disabledInfo = {
  		...this.props.ingredients,
  	};
  	// {salad: true, meat: false...}
  	for (const key in disabledInfo) {
  		disabledInfo[key] = disabledInfo[key] <= 0;
  	}
  	let orderSummary = null;
  	let burger = this.props.error ? <p>Can't find ingredients!</p> : <Spinner />;
  	// Check if we need fetch the ingredients from API
  	if (this.props.ingredients) {
  		burger = (
				<React.Fragment>
					<Burger ingredients={this.props.ingredients} />
					<BuildControls
						price={this.props.totalPrice}
						ingredientAdded={this.props.onAddIngredient}
						ingredientRemoved={this.props.onRemoveIngredient}
						purchasable={this.updatePurchaseState(this.props.ingredients)}
						disabled={disabledInfo}
						ordered={this.purchaseHandler}
					/>
				</React.Fragment>
  		);
  		orderSummary = (
				<OrderSummary
					ingredients={this.props.ingredients}
					purchaseCancel={this.purchasedCancelHandler}
					purchaseContinue={this.purchasedContinueHandler}
					price={this.props.totalPrice}
				/>
      );
  	}
  	// if (this.state.loading) {
  	// 	orderSummary = <Spinner />;
  	// }
  	return (
    <React.Fragment>
      <Modal show={this.state.purchasing} modalClosed={this.purchasedCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </React.Fragment>
  	);
  }
}

const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
		totalPrice: state.totalPrice,
		error: state.error
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onAddIngredient: (ig) => dispatch(burgerBuilderActions.addIngredient(ig)),
		onRemoveIngredient: (ig) => dispatch(burgerBuilderActions.removeIngredient(ig)),
		onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
