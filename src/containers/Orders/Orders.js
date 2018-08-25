import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then((response) => {
        let orderArray = [];
        let orders = response.data;
        for (let key in orders) {
          let order = orders[key];
          orderArray.push({ 
            ...order, 
            id: key 
          });
          // orders[key].id = key;
          // orderArray.push(orders[key]);
        }
        this.setState({loading: false, orders: orderArray});
      })
      .catch((error) => {
        this.setState({loading: false});
      })
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order key={order.id} price={+order.price} ingredients={order.ingredients} />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);