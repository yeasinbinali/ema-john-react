import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './OrderReview.css'

const OrderReview = ({product, handleRemoveCart}) => {
    const {id, name, price, quantity, img, shipping} = product;
    console.log(product.quantity);
    return (
        <div className='review-item'>
            <div className='review-img'>
                <img src={img} alt=''></img>
            </div>
            <div className='review-container'>
                <div className='review-detail-container'>
                    <p className='name'>{name}</p>
                    <p><small>Price: ${price}</small></p>
                    <p><small>Quantity: {quantity}</small></p>
                    <p><small>Shipping: ${shipping}</small></p>
                </div>
                <div className='delete-container'>
                    <button onClick={() => handleRemoveCart(id)} className='delete-btn'>
                        <FontAwesomeIcon className='icon' icon = {faTrashAlt}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderReview;