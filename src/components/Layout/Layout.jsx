import React, {Component} from 'react';

import Auxx from '../../containers/hoc/Auxx';
import './Layout.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer";

class Layout extends Component {

  state = {
    showSideDrawer: true
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  //Because of asnych, do not access state directly, better to use previous state like below
  sideDrawerToggleHandler = () => {
    this.setState((prevState) =>{
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }

  render(){
    return(
      <Auxx>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <Sidedrawer
        open={this.state.showSideDrawer} 
        closed={this.sideDrawerClosedHandler}/>
        <main className='Content'>
          {this.props.children}
        </main>
      </Auxx>
    )
  }
}

export default Layout;