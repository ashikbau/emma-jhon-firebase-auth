import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/UserContext';
import useToken from '../../hooks/useToken';
import './SignUp.css';

const SignUp = () => {
    const [error, setError] = useState(null);
    const { createUser,providerGoogleLogin,loading,setLoading,verifyEmail,updateUser } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();
   

    if (token) {
        navigate('/');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
       
        const image = form.image.files[0]

     

    //     createUser(email, password)
    //         .then(result => {
    //             const user = result.user;
    //             console.log(user);
    //             form.reset();
    //         })
    //         .catch(error => console.error(error));

    // }
    const formData = new FormData()
    formData.append('image', image)
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`
    fetch(url, {
      method: 'POST',
      body: formData,
    })
    .then(res => res.json())
    .then(imageData =>{
      console.log(imageData)
      createUser(email,password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('User Created Successfully.')
                // const userInfo = {
                //     displayName: name
                    
                // }
                updateUser(name,imageData.data.display_url)
                    .then(() => {
                        verifyEmail()
                        saveUser(name, email);
                    })
                    .catch(err => console.log(err));

            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
                setLoading(false)
            });

    })

    
       
        
    }

    const handleGoogleSignin = () => {
        providerGoogleLogin ().then(result=>{
            const user = result.user;
            console.log(user)
            saveUser(user.displayName,user.email)
            setLoading(false)
            
        }).catch( error=>console.error(error.message));
         
         
        
      }

      const saveUser = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);
            })
    }


    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
           
             <Form onSubmit={handleSubmit}>
             <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name='name' placeholder="Name" />
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" name='image' placeholder="Image" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
            <p>Already Have an Account <Link to='/login'>Login</Link></p>
            <p className='text-error'>{error}</p>
            <div className=''>
            <Button onClick={handleGoogleSignin} variant="primary">Google LogIn</Button>
            </div>
        </div>
    );
};

export default SignUp;