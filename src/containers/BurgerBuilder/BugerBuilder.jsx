import React, { Component } from 'react';
import { connect } from 'react-redux';

//Components
import Auxx from '../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese:  0.4,
  meat: 1.3,
  bacon: 0.7 
}

class BugerBuilder extends Component {
 state = {
  //  ingredients: [],
  //  totalPrice: 4,
   purchasable: false,
   purchasing: false,
   loading: false,
   error: false
 }

 componentDidMount () {
  //  axios.get('https://burger-42f8d-default-rtdb.firebaseio.com/Ingredients.json').then(response => {
  //     this.setState({ ingredients: response.data})
  //  })
  //  .catch ( error => {
  //    this.setState({ error: true})
  //  })
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

 purchaseHandler = () => {
   this.setState({purchasing: true})
 }

 purchaseCancelHandler = () => {
   this.setState({purchasing: false});
 }

 purchaseContinueHandler = () => {
  // this.props.history.push('./checkout');
  const query = [];
  for (let i in this.state.ingredients) {
    query.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
  }
  query.push('price=' + this.state.totalPrice);
  const queryString = query.join('&');
  this.props.history.push({
    pathname: '/checkout',
    search: '?' + queryString,
  })
  
 }
  
  render() {


    const disabledInfo = {
      ...this.props.ings
    };
    for ( let key in disabledInfo ) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>"Ingredients can't be loaded"</p> : <Spinner />;

    if ( this.props.ings ) {
         burger = (
            <Auxx>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onRemoveIngredient}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.props.price} />
            </Auxx>
        );
        
        orderSummary = <OrderSummary
            ingredients={this.props.ings}
            price={this.props.price}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler} />;
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onRemoveIngredient: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BugerBuilder, axios));