import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Inventory = () => {
    return (
        <div className=''>
            <h2>This is Inventory</h2>
            {/* <form action="">
        <label htmlFor="">product name: </label>
        <input type="text" />
        <br />
        <label htmlFor="">product price: </label>
        <input type="text" />
        <br />
        <label htmlFor="">product quantity: </label>
        <input type="text" />
        <br />
        <label htmlFor="">product image: </label>
        <input  type="file" />
        <br />
        <button className="btn btn-info">
          Add Product
        </button>
      </form> */}
       <Form>
      <Form.Group className="mb-3 w-25 ml-5 " controlId="formBasicEmail">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" placeholder="Product Name" />
        
      </Form.Group>

      <Form.Group className="mb-3 w-25 ml-5 " controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" placeholder="Price" />
      </Form.Group>
      <Form.Group className="mb-3 w-25 ml-5 " controlId="formBasicPassword">
        <Form.Label>Product Quantity</Form.Label>
        <Form.Control type="text" placeholder="Product Quantity" />
      </Form.Group>
      <Form.Group className="mb-3 w-25 ml-5 " controlId="formBasicPassword">
        <Form.Label>Product Image</Form.Label>
        <Form.Control type="file" placeholder="Price" />
      </Form.Group>
      
      <Button className='ml-5 ' variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </div>
    );
};

export default Inventory;