import React from 'react';

import Auxx from '../../containers/hoc/Auxx';
import './Layout.css';

const layout = (props) => (
  <Auxx>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className='Content'>
      {props.children}
    </main>
  </Auxx>
 
);

export default layout;