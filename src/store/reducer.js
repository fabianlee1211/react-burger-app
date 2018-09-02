import * as actionTypes from './actions';

const initialState = {
  ingredients: null,
  totalPrice: 4
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
    case actionTypes.REMOVE_INGREDIENTS:
    default:
      return state;
  }
}

export default reducer;