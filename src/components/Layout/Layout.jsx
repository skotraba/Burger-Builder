import React from 'react';

import Auxx from '../../containers/hoc/Auxx';
import './Layout.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";

const layout = (props) => (
  <Auxx>
    <Toolbar/>
    <main className='Content'>
      {props.children}
    </main>
  </Auxx>
 
);

export default layout;