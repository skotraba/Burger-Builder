import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxx from '../../../containers/hoc/Auxx';

import './Sidedrawer.css';


const sideDrawer = (props) => {
  let attachedClasses = ["Sidedrawer", "Close"]
  if(props.open) {
    attachedClasses = ["Sidedrawer", "Open"]
  }


  return (
    <Auxx>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={"Logo"}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </Auxx>
    
  );
}

export default sideDrawer;