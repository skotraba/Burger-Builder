import React, { Component } from 'react';

import Auxx from '../hoc/Auxx';
import Burger from '../../components/Burger/Burger';

class BugerBuilder extends Component {
 state = {
   ingredients : {
     salad: 1,
     bacon: 1,
     cheese: 2,
     meat: 2
   }
 }
  
  
  render() {
    return (
     <Auxx>
       <Burger ingredients={this.state.ingredients}/>
       <div>Build Controls</div>
     </Auxx>
    );
  }
}

export default BugerBuilder;