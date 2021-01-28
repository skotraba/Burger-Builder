import React from 'react';

import Auxx from '../../containers/hoc/Auxx';
import './Layout.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer";

const layout = (props) => (
  <Auxx>
    <Toolbar/>
    <Sidedrawer/>
    <main className='Content'>
      {props.children}
    </main>
  </Auxx>
 
);

export default layout;