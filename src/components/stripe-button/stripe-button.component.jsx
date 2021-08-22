import React from 'react' ; 
import StripeCheckout from 'react-stripe-checkout'; 


const stripeCheckoutButton = ({price}) => {

    const priceForStripe = price * 100 ;  
    const publishableKey = "pk_test_51JQsuMGPAJuUPrGLISJLPGytL8RQ6ymgH2InhVNxOXoQ080WsXbIa4yxvMK24sW1uB3DRsts1iM3YFbtqUMDZQ8s00LTJI7fVE" ; 
    
    const onToken = token => {
        console.log(token);
        alert('Payment Succesful!');
      };

    return(
        <StripeCheckout
        label='Pay Now'
        name='CRWN Clothing Ltd.'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        /> 
    )
}


export default  stripeCheckoutButton ; 