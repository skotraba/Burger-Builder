import React, {Component} from 'react';

//Components
import Layout from './components/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';

//Containers
import BurgerBuilder from './containers/BurgerBuilder/BugerBuilder';

class App extends Component {
  render() {
    return (
    <div>
      <Layout>
        <BurgerBuilder/>
        <Checkout/>
      </Layout>
    </div>
    )
    
  };
}

export default App;
