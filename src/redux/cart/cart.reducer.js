import { cartActionTypes } from './cart.types';


const INTIAL_STATE = {
    hidden: true 
}

const cartReducer = (state = INTIAL_STATE, actions) => {
    switch (actions.type) {
        case cartActionTypes.TOGGLE_CART_HIDDEN : 
            return {
                ...state,
                hidden: !state.hidden 
            }
        default:
            return state 
    }
}

export default cartReducer; 