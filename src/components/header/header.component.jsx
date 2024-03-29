import React from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect'; 

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';
import { auth } from './../../firebase/firebase.utils'; 
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/cart.selectors';




 const  Header =  ( {currentUser , hidden } ) =>  {
    return (
        <div className='header'> 
            <Link className='logo-container' to='/'>
                <Logo  className='logo' /> 
            </Link>
            <div className='options' > 
            <Link className='option' to='/shop'>
                SHOP  
            </Link>
            <Link className='option' to='/shop'>
                CONTACT 
                </Link>
                {
                    currentUser ?
                        <div
                            className='option' onClick={() => auth.signOut()}
                        >
                            SIGNOUT 
                        </div>
                        :
                        <Link className='option' to='/signin'>
                        SIGNIN  
                        </Link>
                    
                }
               
                <CartIcon />
            </div>
            {
                hidden ? null
                    : 
                    <CartDropdown /> 
            }
            
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser : selectCurrentUser , 
    hidden : selectCartHidden 
    
})
export default connect(mapStateToProps)(Header) ; 