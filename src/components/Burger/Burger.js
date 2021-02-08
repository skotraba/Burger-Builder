import React from 'react';

import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
    console.log("Props in burger: ", props)
    let transformedIngredients = Object.keys( props.ingredients )
        .map( igKey => {
            console.log("igKey: ", igKey)
            console.log("ingredients: ", props.ingredients)
            let me = props.ingredients[igKey];
            console.log("me: ", JSON.stringify(me));
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
                console.log("i: ", i);
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);


    console.log("transformedIngredients: ", transformedIngredients)
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={"Burger"}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;