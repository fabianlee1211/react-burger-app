import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import DeleteSummary from '../../components/Order/DeleteSummary/DeleteSummary'
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

class Orders extends Component {
  state = {
    deleting: false,
    selectedOrder: null
  }
 
  componentDidMount() {
    this.props.onFetchOrders();
  }

  deleteHandler = (order) => {
    this.setState({ 
      deleting: true,
      selectedOrder: order
    });
  }

  deleteConfirmHandler = (id) => {
    console.log('Deleting Order ID', id);
    this.props.onDeleteOrder(id);
    this.setState({ 
      deleting: false,
      selectedOrder: null
    });
  }

  deleteCancelHandler = () => {
    this.setState({ 
      deleting: false,
      selectedOrder: null 
    });
  }

  render() {
    let orders = <Spinner />;
    let deleteSummary = null;
    if (!this.props.loading) {
      orders = (
        this.props.orders.map((order) => (
          <Order key={order.id} price={+order.price} ingredients={order.ingredients} clicked={() => this.deleteHandler(order)} />
        ))
      );
    }
    if (this.state.selectedOrder) {
      deleteSummary = (
        <DeleteSummary 
          selectedOrder={this.state.selectedOrder}
          deleteConfirm={() => this.deleteConfirmHandler(this.state.selectedOrder.id)}
          deleteCancel={this.deleteCancelHandler}
        />
      );
    }
    return (
      <div>
        <Modal show={this.state.deleting} modalClosed={this.deleteCancelHandler}>
          { deleteSummary }
        </Modal>
        { orders }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrder()),
    onDeleteOrder: (id) => dispatch(actions.deleteOrder(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));