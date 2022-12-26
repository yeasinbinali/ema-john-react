import React from 'react';
import './Products.css';

const Products = (props) => {
    const {name, seller, price, ratings, img} = props.product;
    const {handleAddToCart, removeCart} = props;

    return (
        <div className='product-container'>
            <img src={img} alt='img-failed'></img>
            <div className='product-info'>
                <h2 className='product-title'>{name}</h2>
                <p>Price: ${price}</p>
                <p style={{margin: 0}}><small>Manufacturer: <b>{seller}</b></small></p>
                <p><small>Ratings: <b>{ratings}</b></small></p>
            </div>
            <div className='button'>
                <button onClick={() => handleAddToCart(props.product)} className='cart-btn-left'>
                    <p>Add to Cart</p>
                </button>
                <button onClick={() => removeCart(props.product)} className='cart-btn-right'>
                    <p>Remove</p>
                </button>
            </div>
        </div>
    );
};

export default Products;
