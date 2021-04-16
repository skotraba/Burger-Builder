import React from 'react';

import './Input.css';
onchange={} 
const Input = (props) => {
  let inputElement = null;
  const classes = ["InputElement"]

  if(props.invalid && props.shouldValidate && props.touched) {
    classes.push("Invalid");
  }


  switch (props.elementType) {
    case('input'):
        inputElement = <input onChange={props.changed} className={classes.join(' ')} {...props.elementConfig} value={props.value}/>
        break;
    case ('textarea'):
        inputElement = <textarea onChange={props.changed} className={classes.join(' ')} {...props.elementConfig}/>
        break;
    case ('select'):
      inputElement = (
      <select
        onChange={props.changed} 
        className={classes.join(' ')}
        value={props.value}>
        {props.elementConfig.options.map(option => (
          <option key={option.value} value={option.value}>{option.displayValue}</option>
        ))}
      </select>)
      break;
    default:
      inputElement = <input className="InputElement" {...props.elementConfig}/>
      break;
  }

  


  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
    </div>
  );
}

export default Input;