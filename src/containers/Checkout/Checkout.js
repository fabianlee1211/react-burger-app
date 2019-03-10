import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
import * as actions from '../../store/actions';

const Checkout = props => {
  useEffect(() => {
    props.onInitPurchase();
  }, []);

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to='/' />;
  if (props.ingredients) {
    const purchaseRedirect = props.purchased ? <Redirect to='/' /> : null;
    summary = (
      <div>
        {purchaseRedirect}
        <CheckoutSummary
          ingredients={props.ingredients}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route
          path={props.match.path + '/contact-data'}
          component={ContactData}
          // render={(props) => (
          //   <ContactData {...props}
          //     ingredients={this.props.ingredients}
          //     totalPrice={this.props.totalPrice}
          //   />
          // )}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitPurchase: () => dispatch(actions.purchaseInit())
  };
};

// We can use withRouter HOC to pass router props to children
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
