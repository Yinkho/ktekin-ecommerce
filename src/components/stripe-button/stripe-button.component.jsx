import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100 //Because Stripe prices are calculated in cents
    const publishableKey = "pk_test_8fKZJpdurx4DPu4z3dEzerme00Kn6E9TME"

    const onToken = token => {
        alert('Payment Successful')
    }

    return (
        <StripeCheckout 
            label="Pay Now"
            name="CRWN Clothind Ltd."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton