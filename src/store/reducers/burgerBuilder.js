import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
};

const reducer = (state = initialState, action) => {
  let updatedIngredient = null, 
      updatedIngredients = null, 
      updatedState = null;
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
      updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
      updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
      return updatedObject(state, updatedState);
    case actionTypes.REMOVE_INGREDIENTS:
      updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
      updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
      updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
      return updatedObject(state, updatedState);
    case actionTypes.SET_INGREDIENTS:
      updatedState = {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
      }
      return updatedObject(state, updatedState);
    case actionTypes.FETCH_INGREDIENTS_FAIL:
      return updatedObject(state, { error: true });
    default:
      return state;
  }
}

export default reducer;