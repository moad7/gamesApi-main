import React from "react";
import {useLocation} from 'react-router-dom';

const Cart = props => {

    const location = useLocation();

    const {reviewState} = location.state;

    return(
        <p style={{color:'#fff'}}>Game: {reviewState.title}</p>
    )
}


export default Cart;