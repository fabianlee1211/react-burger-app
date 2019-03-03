import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = orderData => {
  return (dispatch, getState) => {
    dispatch(purchaseBurgerStart());
    const token = getState().auth.token;
    axios
      .post('/orders.json?auth=' + token, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(err => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrderSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrderFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrder = () => {
  // Can use getState to get the state in redux store
  return (dispatch, getState) => {
    dispatch(fetchOrderStart());
    const { token, userId } = getState().auth;
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get('/orders.json' + queryParams)
      .then(response => {
        const orderArray = [];
        const orders = response.data;
        for (let key in orders) {
          let order = orders[key];
          orderArray.push({
            ...order,
            id: key
          });
          // orders[key].id = key;
          // orderArray.push(orders[key]);
        }
        dispatch(fetchOrderSuccess(orderArray));
      })
      .catch(err => {
        dispatch(fetchOrderFail(err));
      });
  };
};

export const deleteOrderSuccess = () => {
  return {
    type: actionTypes.DELETE_ORDER_SUCCESS
  };
};

export const deleteOrderFail = error => {
  return {
    type: actionTypes.DELETE_ORDER_FAIL,
    error: error
  };
};

export const deleteOrderStart = () => {
  return {
    type: actionTypes.DELETE_ORDER_START
  };
};

export const deleteOrder = id => {
  return (dispatch, getState) => {
    dispatch(deleteOrderStart());
    const token = getState().auth.token;
    axios
      .delete('/orders/' + id + '.json?auth=' + token)
      .then(response => {
        if (response.status === 200) {
          console.log(`Order ID ${id} is deleted`);
          dispatch(deleteOrderSuccess());
          dispatch(fetchOrder());
        }
      })
      .catch(error => {
        console.log('Fail to delete');
        dispatch(deleteOrderFail(error));
      });
  };
};
