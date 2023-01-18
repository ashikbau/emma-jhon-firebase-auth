import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import logo from '../../images/Logo.svg';
import './Header.css';
import { FaUser } from 'react-icons/fa';
import { Image } from 'react-bootstrap';


const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {
                    user?.uid ?
                        <>
                            <button className='btn-logout' onClick={logOut}>Log out</button>
                            <span className='mt-8 text-white px-2'>{user?.displayName}</span>

                        </>
                        :
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign up</Link>
                        </>
                }
                {user?.photoURL ?
                    <>

                        <Image src={user?.photoURL} style={{ borderRadius: "50%", height: "75px", width: "75px" }} />






                    </>
                    : <FaUser ></FaUser>
                }
            </div>
        </nav>
    );
};

export default Header;