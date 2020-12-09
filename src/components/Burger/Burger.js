import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import './Burger.css';

const burger = (props) => {
    //Object is a javascript object and object.keys returns an array
    const transformedIngredients = Object.keys(props.ingredients).map(igKey => { 
        return[...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
    })
    return(
        <div className="Burger">
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;