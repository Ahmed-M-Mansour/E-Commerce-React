  import React from 'react';
  import { Redirect, Route, Switch } from "react-router-dom"
  import { connect } from 'react-redux'; 
  import { createStructuredSelector } from 'reselect';


  import './App.css';
  import HomePage from './pages/homePage/homePage.component.jsx'
  import ShopPage from './pages/shop/shop.component.jsx';
  import SignInPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
  import CheckoutPage from './pages/checkout/checkout.component'; 

  import Header from './components/header/header.component'; 

  import { auth , createUserProfileDocument  } from './firebase/firebase.utils';
  import {setCurrentUser} from './redux/user/user.actions'
  import {selectCurrentUser} from './redux/user/cart.selectors' ; 

  class App extends React.Component {

    unSubscribeFromAuth = null;

    componentDidMount() {
      const { setCurrentUser } = this.props;
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
          });
        }

        setCurrentUser( );
      });
    }

    componentWillUnmount() {
      this.unsubscribeFromAuth();
    }
  
    
    render() {
      
    
    return (
          <div>
            <Header   /> 
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/shop'   component={ShopPage} />
              <Route path='/checkout'   component={CheckoutPage} />

              <Route path='/signin'
                render={() =>
                  this.props.currentUser
                    ?
                    (  <Redirect to='/' />   )
                    :
                    (<SignInPage />)
                  
                } />
              
            </Switch>
          </div>
        );
  }
  }

  const mapStateToProps = createStructuredSelector({
         currentUser: selectCurrentUser 
  })
  const mapDispatchToProps = dispatch => ({
         setCurrentUser: user => dispatch(setCurrentUser(user))

  })
  export default connect( mapStateToProps , mapDispatchToProps  )(App);
