import React, { Component } from 'react';

import Auxx from '../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese:  0.4,
  meat: 1.3,
  bacon: 0.7 
}

class BugerBuilder extends Component {
 state = {
   ingredients: [],
   totalPrice: 4,
   purchasable: false,
   purchasing: false,
   loading: false,
   error: false
 }

 componentDidMount () {
   axios.get('https://burger-42f8d-default-rtdb.firebaseio.com/Ingredients.json').then(response => {
      this.setState({ ingredients: response.data})
      console.log("ComponentDidMount")
      console.log(response.data)
   })
   .catch ( error => {
     this.setState({ error: true})
   })
 }

 updatePurchaseState (ingredients) {
  const sum = Object.keys(ingredients)
  .map(igKey => {
      return ingredients[igKey];
  } )
  .reduce((sum, el) => {
      return sum + el;
  }, 0);
  this.setState({ purchasable: sum > 0 } );

 }

 addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);

 }

 removeIngredientHandler = (type) => {
  const oldCount = this.state.ingredients[type];
  if(oldCount <= 0){
    return;
  }
  const updatedCount = oldCount - 1;
  const updatedIngredients = {
    ...this.state.ingredients
  };
  updatedIngredients[type] = updatedCount;
  const priceDeduction = INGREDIENT_PRICES[type];
  const oldPrice = this.state.totalPrice;
  const newPrice = oldPrice - priceDeduction;
  this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  this.updatePurchaseState(updatedIngredients);
 }

 purchaseHandler = () => {
   this.setState({purchasing: true})
 }

 purchaseCancelHandler = () => {
   this.setState({purchasing: false});
 }

 purchaseContinueHandler = () => {
  //  console.log("continue")
  this.setState({ loading: true })
  const order = {
    ingredients: this.state.ingredients,
    price: this.state.totalPrice,
    customer: {
      name: "Shannon",
      address: "Test street 1",
      zipCode: "12345",
      country: "Germany"
    },
    email: "test@gmail.com"
  }
   //firebase only add .json for firebase to function correclty
   axios.post('/orders.json', order)
   .then(response => { 
     this.setState({ loading: false, purchasing: false })
    })
   .catch (error => {
     console.log(error)
     this.setState({ loading: false, purchasing: false })
  });
 }
  
  
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for ( let key in disabledInfo ) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>"Ingredients can't be loaded"</p> : <Spinner />;

    console.log(this.state.ingredients)
    if ( this.state.ingredients ) {
      // console.log("Render: ", this.state.ingredients)
        burger = (
            <Auxx>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </Auxx>
        );
        
        orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />;
    }
    if ( this.state.loading ) {
      console.log("loading")
        orderSummary = <Spinner />;

    }
    // {salad: true, meat: false, ...}
    return (
        <Auxx>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxx>
    );
  }
}

export default withErrorHandler(BugerBuilder, axios);