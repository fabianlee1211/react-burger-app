import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../utils/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = (state, action) => {
  return updatedObject(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
  return updatedObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updatedObject(action.orderData, { id: action.orderId });
  return updatedObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const purchaseBurgerFail = (state, action) => {
  return updatedObject(state, { loading: false });
};

const fetchOrdersStart = (state, action) => {
  return updatedObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
  return updatedObject(state, {
    loading: false,
    orders: action.orders
  });
};

const fetchOrdersFail = (state, action) => {
  return updatedObject(state, { loading: false });
};

const deleteOrderStart = (state, action) => {
  return updatedObject(state, { loading: true });
};

const deleteOrderSuccess = (state, action) => {
  return updatedObject(state, { loading: false });
};

const deleteOrderFail = (state, action) => {
  updatedObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    case actionTypes.DELETE_ORDER_START:
      return deleteOrderStart(state, action);
    case actionTypes.DELETE_ORDER_SUCCESS:
      return deleteOrderSuccess(state, action);
    case actionTypes.DELETE_ORDER_FAIL:
      return deleteOrderFail(state, action);
    default:
      return state;
  }
};

export default reducer;
