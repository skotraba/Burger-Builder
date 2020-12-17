import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import './Burger.css';

const burger = (props) => {
    //Object is a javascript object and object.keys returns an array
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => { 
        return[...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
    })
    console.log("Before reduce:\n")
    console.log(transformedIngredients)
    
    transformedIngredients = transformedIngredients.reduce((arr, el) => {
        return arr.concat(el)
    }, [])
    console.log("After reduce:\n")
    console.log(transformedIngredients)
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return(
        <div className="Burger">
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;