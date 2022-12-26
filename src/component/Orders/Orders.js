import './Orders.css'

const Orders = (props) => {
    const {cart, clearCart} = props;
    let total = 0;
    let quantity = 0;
    let shipping = 0;

    for(const selectedCart of cart){
        quantity = quantity + selectedCart.quantity;
        total = total + selectedCart.price * selectedCart.quantity;
        shipping = shipping + selectedCart.shipping;
    }

    const tax = (total * 0.1).toFixed(2);
    const grandTotal = total + shipping + parseFloat(tax);

    return (
        <div className='orders-review'>
            <h4 className='review-title'>Order Review</h4>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: {total}</p>
            <p>Shipping Cost: {shipping}</p>
            <p>Tax(10%): {tax}</p>
            <p><b>Grand Total: {grandTotal.toFixed(2)}</b></p>
            <button onClick={() => clearCart(props.product)} className='cart-btn'>Clear Cart</button>
        </div>
    );
};

export default Orders;