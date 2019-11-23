import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors'

import './checkout.styles.scss'

const CheckoutPage = ({ cartItems, total }) => (
    <div className='checkout-page'>
        <div className="checkout-header">
            <div className="header-bloc">
                <span>
                    Product
                </span>
            </div>
            <div className="header-bloc">
                <span>
                    Description
                </span>
            </div>
            <div className="header-bloc">
                <span>
                    Quantity
                </span>
            </div>
            <div className="header-bloc">
                <span>
                    Price
                </span>
            </div>
            <div className="header-bloc">
                <span>
                    Remvoe
                </span>
            </div>
        </div>
        {
            cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
        }

        <div className="total">TOTAL : ${total}</div>
        <StripeCheckoutButton price={total} />
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(mapStateToProps)(CheckoutPage)