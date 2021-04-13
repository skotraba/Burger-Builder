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
        value: ''
      },
      street:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your stree name',
        },
        value: ''
      },
      zipCode:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your zipcode',
        },
        value: ''
      },
      country:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: ''
      },
      email:{
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email',
        },
        value: ''
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
        value: ''
      },
    },
    loading: false
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Shannon",
        address: "Test street 1",
        zipCode: "12345",
        country: "Germany",
        email: "test@gmail.com"
      },
      
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
  }

  render() {

    const formElementsArray = [];
    for(let key in this.state.orderform) {
      formElementsArray.push({
        id: key,
        config: this.state.orderform[key]
      })
    }

    console.log(formElementsArray)

    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input 
          key={formElement.key}
          elementType={formElement.config.elementType} 
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}/>
        ))}
        <Button clicked={this.orderHandler} btnType="Success">ORDER HERE</Button>
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