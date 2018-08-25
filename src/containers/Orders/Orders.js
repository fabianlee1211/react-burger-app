import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then((response) => {
        let orderWithId = {};
        let orderArray = [];
        let orders = response.data;
        for (let key in orders) {
          let order = orders[key];
          orderWithId =  { ...order, id: key };
          orderArray.push(orderWithId);
          // orders[order].id = order;
          // dummy.push(orders[order]);
        }
        console.log(orderArray);
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

export default Orders;