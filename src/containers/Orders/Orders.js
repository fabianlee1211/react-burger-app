import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import DeleteSummary from '../../components/Order/DeleteSummary/DeleteSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

const Orders = props => {
  const [deleting, setDeleting] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    props.onFetchOrders();
  }, []);

  const deleteHandler = order => {
    setDeleting(true);
    setSelectedOrder(order);
  };

  const deleteConfirmHandler = id => {
    console.log('Deleting Order ID', id);
    props.onDeleteOrder(id);
    setDeleting(false);
    setSelectedOrder(null);
  };

  const deleteCancelHandler = () => {
    setDeleting(false);
    setSelectedOrder(null);
  };

  let orders = <Spinner />;
  let deleteSummary = null;
  if (!props.loading) {
    orders = props.orders.map(order => (
      <Order
        key={order.id}
        price={+order.price}
        ingredients={order.ingredients}
        clicked={() => deleteHandler(order)}
      />
    ));
  }
  if (selectedOrder) {
    deleteSummary = (
      <DeleteSummary
        selectedOrder={selectedOrder}
        deleteConfirm={() => deleteConfirmHandler(selectedOrder.id)}
        deleteCancel={deleteCancelHandler}
      />
    );
  }

  return (
    <div>
      <Modal show={deleting} modalClosed={deleteCancelHandler}>
        {deleteSummary}
      </Modal>
      {orders}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrder()),
    onDeleteOrder: id => dispatch(actions.deleteOrder(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
