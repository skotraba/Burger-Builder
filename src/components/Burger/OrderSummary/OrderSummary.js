import React, { Component } from 'react';

import "../../../containers/hoc/Auxx";
import Auxx from '../../../containers/hoc/Auxx';
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {

  componentWillUpdate() {
    console.log('order summary will update')
  }


  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey} </span>: {this.props.ingredients[igKey]}
        </li> )
    })

    return(
        <Auxx>
          <h3>Your order</h3>
          <p>A burger with the following ingredients: </p>
          <ul>
            {ingredientSummary}
          </ul>
          <p><strong>Total Price: $</strong> {this.props.price.toFixed(2)} </p>
          <p>Continue to Checkout?</p>
          <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
          <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
        </Auxx>
      )
    
  }
} 
  


export default OrderSummary;