import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import './Sidedrawer.css';

const Sidedrawer = (props) => {
  
  
  return (
    <div className={'Sidedrawer'}>
      <div className={"Logo"}>
        <Logo/>
      </div>
      <nav>
        <NavigationItems/>
      </nav>
    </div>
  );
}

export default Sidedrawer;