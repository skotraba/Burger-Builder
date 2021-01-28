import React from 'react';

import "./Modal.css";
import Auxx from "../../../containers/hoc/Auxx";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {
  return(
    <Auxx>
      <Backdrop show={props.show} clicked={props.modalClosed}/>
      <div 
        className={"Modal"}
        style={{
          transfrom: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? '1' : '0',
          zIndex: props.show ? '500' : '-500'
        }}>
          {props.children}
      </div>
    </Auxx>
    
  )
};

export default modal;