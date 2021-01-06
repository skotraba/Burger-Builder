import React from 'react';

import "../../../containers/hoc/Auxx";
import auxx from '../../../containers/hoc/Auxx';
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey} </span>: {props.ingredients[igKey]}</li>
  })
  return (
    <auxx>
      <h3>Your order</h3>
      <p>A burger with the following ingredients: </p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: $</strong> {props.price.toFixed(2)} </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
    </auxx>
  )
}

export default orderSummary;