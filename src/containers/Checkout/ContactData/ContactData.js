import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import './ContactData.css';

class ContactData extends Component {

  state = {
    orderform:{
      name:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: null,
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your stree name',
        },
        value: null,
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your zipcode',
        },
        value: null,
        validation: {
          required: true,
          minlength: 5
        },
        valid: false,
        touched: false
      },
      country:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: "Country",
        },
        value: null,
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email:{
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: "Your email",
        },
        value: null,
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod:{
        elementType: 'select',
        elementConfig: {
          options: [
            {
            value: 'fastest',
            displayValue: 'Fastest'
            },
            {
              value: 'cheapest',
              displayValue: "Cheapest"
            }
        ]
        },
        value: "fastest",
        validation: {},
        valid: true
      },
    },
    formIsValid: false,
    loading: false
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {};


    for (let formElementIdentifier in this.state.orderform) {
      formData[formElementIdentifier] = this.state.orderform[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      
    }
     //firebase only add .json for firebase to function correclty
     axios.post('/orders.json', order)
     .then(response => { 
       this.setState({ loading: false })
       this.props.history.push('/');
      })
     .catch (error => {
       console.log(error)
       this.setState({ loading: false})
    });
    this.setState({ loading: false})
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;

    }

    if (rules.minlength) {
      isValid = value.length >= rules.minlength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderform
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    }

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) { 
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }

    this.setState({orderform: updatedOrderForm, formIsValid: formIsValid});

  }

  render() {

    const formElementsArray = [];
    for(let key in this.state.orderform) {
      formElementsArray.push({
        id: key,
        config: this.state.orderform[key]
      })
    }

    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input 
          key={formElement.key}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          elementType={formElement.config.elementType} 
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ))}
        <Button clicked={this.orderHandler} disabled={!this.state.formIsValid} btnType="Success">ORDER HERE</Button>
      </form>
    );

    if(this.state.loading) {
      return <Spinner/>
    }

    return (
      <div className="ContactData">
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;