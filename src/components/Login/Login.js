import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import useToken from '../../hooks/useToken';
import './Login.css';

const Login = () => {
    const { signIn,providerGoogleLogin,setLoading,loading,resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [loginError, setLoginError] = useState(' ');
    
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);


    
    const from = location.state?.from?.pathname || '/'

    if (token) {
        navigate(from, { replace: true });
    }

    const handleSubmit = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                navigate(from, {replace: true})
            })
            .catch(error => console.error(error));
    }

    const handleGoogleSignin = () => {
        providerGoogleLogin ().then(result=>{
            const user = result.user;
            console.log(user)
            saveUser(user.displayName,user.email)
            setLoading(false)
            
        }).catch( error=>console.error(error.message));
         
         
        
      }


      const handleBlur= (event)=>{
    
        const email = event.target.value;
        setLoginError(email);
       
    }
    
            // Pass reset
      const handleReset = () => {
      
       
    
        if(!loginError){
         
          console.log('There is no mail')
            alert('please enter your email');
            return
        }
        else{
          console.log('email',loginError)
      
       
          resetPassword(loginError)
            .then(() => {
              
              toast.success('Please check your email for reset link')
            })
            .catch(err => {
              toast.error(err.message)
              console.log(err)
              setLoading(false)
            })
    
    
        }
       
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
                    setLoginUserEmail(email);
                })
        }
    


    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <Form onSubmit={handleSubmit}>
            
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control  onBlur={handleBlur} type="email" name='email' placeholder="Enter email" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' placeholder="Password" />
      </Form.Group>
      <div>
          {loginError && <p className='text-red-600'>{loginError}</p>}
          </div>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

            <p>New to ema john <Link to='/signup'>Create a New Account</Link></p>
            <div className=''>
            <Button onClick={handleGoogleSignin} variant="primary">Google LogIn</Button>
            </div>
            <button
            onClick={handleReset}
            className='text-xs hover:underline text-gray-400 btn-link'
          >
            Forgot password?
          </button>
        </div>
    );
};

export default Login;