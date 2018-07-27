import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  componentWillUpdate () {
    console.log('[OrderSummary] Will Update');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map((igKey) => {
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
    })
    return (
      <React.Fragment>
        <h3>Your Order</h3>
        <p>Delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <h3><strong>Total Price: {this.props.price.toFixed(2)}</strong></h3>
        <p>Continue to Checkout?</p>
        <Button clicked={this.props.purchaseCancel} btnType="Danger">CANCEL</Button>
        <Button clicked={this.props.purchaseContinue} btnType="Success">CONTINUE</Button>
      </React.Fragment>
    );
  }
}

export default OrderSummary;