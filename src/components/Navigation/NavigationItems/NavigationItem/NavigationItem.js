import React from 'react';
import { NavLink } from 'react-router-dom';

import "./NavigationItem.css";

const navigationItem = (props) => {

  // console.log(props)

  return (
    <li className="NavigationItem">
      <NavLink 
      exact
      to={props.link}>{props.children}
      </NavLink>
    </li>
  );
}



export default navigationItem;