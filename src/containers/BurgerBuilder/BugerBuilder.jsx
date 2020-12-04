import React, { Component } from 'react';

import Auxx from '../hoc/Auxx';

class BugerBuilder extends Component {
  render() {
    return (
     <Auxx>
       <div>Burger</div>
       <div>Build Controls</div>
     </Auxx>
    );
  }
}

export default BugerBuilder;