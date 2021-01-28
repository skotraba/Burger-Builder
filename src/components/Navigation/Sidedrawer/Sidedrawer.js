import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../containers/hoc/Auxx';

import './Sidedrawer.css';
// import modal from '../../UI/Modal/Modal';

const Sidedrawer = (props) => {
  let attachedClasses = ["Sidedrawer", "Close"]
  if(props.open) {
    attachedClasses = ["Sidedrawer", "Open"]
  }

  // console.log(attachedClasses.join(' '))

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={"Logo"}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </Aux>
    
  );
}

export default Sidedrawer;