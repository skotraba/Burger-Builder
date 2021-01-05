import React from 'react';

import "../../../containers/hoc/Auxx";
import auxx from '../../../containers/hoc/Auxx';

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
      <p>Continue to Checkout?</p>
    </auxx>
  )
}

export default orderSummary;