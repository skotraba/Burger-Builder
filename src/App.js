import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

//Components
import Layout from './components/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';


//Containers
import BurgerBuilder from './containers/BurgerBuilder/BugerBuilder';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route />
        </Switch>
      </Layout>
    </div>
    )
    
  };
}

export default App;
