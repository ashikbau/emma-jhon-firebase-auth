import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './ReviewItem.css';
import { Link, useNavigate } from 'react-router-dom';

const ReviewItem = ({ product, handleRemoveItem }) => {
    const { _id, name, price, quantity, shipping, img } = product;


    const navigate = useNavigate();
    const handleConfirmOrder = (product) => {
        navigate('/confirmOrder', { state: product })
        console.log(product)


    }

    return (
        <div className='review-item'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='mt-4 px-3'>

                {/* <Link to='/confirmOrder'>
                <button onClick={()=>{handleConfirmOrder(product)}} style={{ borderRadius: "50%", height: "65px", width: "65px",display:'flex', alignItems:'center',backgroundColor:' #EB5757', textDecoration:'none' }} >Add Order</button>
                </Link> */}

                {product &&
                    <button onClick={() => handleConfirmOrder(product)} className="btn btn-sm btn-primary">Add Order </button>
                }
            </div>
            <div className="review-details-container">
                <div className="review-details">
                    <p>{name}</p>
                    <p><small>Price: ${price}</small></p>
                    <p><small>Shipping: ${shipping}</small></p>
                    <p><small>Quantity: {quantity}</small></p>
                </div>
                <div className="delete-container">
                    <button onClick={() => handleRemoveItem(_id)} className='btn-delete'>
                        <FontAwesomeIcon className='delete-icon' icon={faTrashAlt}></FontAwesomeIcon>
                    </button>
                </div>

            </div>

        </div>
    );
};

export default ReviewItem;