import React from 'react';
import { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import UserContext, { AuthContext } from '../../contexts/UserContext';

const ConfirmOrders = () => {

    const {state:product} = useLocation();
    const {_name, price, quantity, shipping, img} = product;
    const {user} = useContext(AuthContext)
    console.log(product)



    const handlePlaceOrder = event=>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const price= form.price.value;
        const shipping = form.shipping.value;
        const quantity= form.quantity.value;
        const photoURL= form.photoURL.value;
     
    
        
        const order = {
            name,
           email,
            price,
            shipping,
            quantity,
            img: photoURL
        }
    
        // if(phone.length > 10){
            //     alert('Phone number should be 10 characters or longer')
            // }
            // else{
    
            // }
    
            fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('access-Token')}`
                },
                body: JSON.stringify(order)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if(data.acknowledged){
                        alert('Order placed successfully')
                        form.reset();
                        
                    }
                })
                .catch(er => console.error(er));
    
    }
    

    return (
        <div className='ml-5 mr-5 ' style={{width: "25%"}}>
            <Form onSubmit={handlePlaceOrder }>
      <Form.Group className="mb-3 "  controlId="formBasicEmail">
        <Form.Label  style={{width: "50%"}}>Name</Form.Label>
        <Form.Control type="text" name='name' disabled defaultValue={product?.name} placeholder="Name" />
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' disabled defaultValue={user?.email} placeholder="Enter email" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" name='price' disabled defaultValue= {product?.price} placeholder="Price" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicShipping">
        <Form.Label>Shipping</Form.Label>
        <Form.Control type="number" name='shipping' disabled defaultValue= {product?.shipping} placeholder="Shipping" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formQuantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="number" name='quantity' disabled defaultValue= {product?.quantity} placeholder="quantity" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formQuantity">
        <Form.Label>photoURL</Form.Label>
        <Form.Control type="text" name='photoURL' disabled defaultValue= {product?.img} placeholder="PhotoURL" />
      </Form.Group>
     
      
      <Button variant="primary" type="submit">
        Place YOur Order
      </Button>
    </Form>
        </div>
    );
};

export default ConfirmOrders;