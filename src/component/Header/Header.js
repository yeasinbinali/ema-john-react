import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import './Header.css'
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../UserContext/UserContext';


const Header = () => {
    const {user, logOutUser} = useContext(AuthContext);
    return (
        <nav>
            <Navbar className='navbar'>
            <Container>
                <img src={logo} alt='img-failed'/>
                <Nav>
                    <Link to='/'>Shop</Link>
                    <Link to='/orders'>Orders</Link>
                    {
                        user?.uid ? 
                        <button className='btn-logout' onClick={logOutUser}>Logout</button>
                        : <>
                            <Link to="/signup">Signup</Link>
                            <Link to="/login">Login</Link>
                          </>
                    }
                </Nav>
            </Container>
            </Navbar>
        </nav>
    );
};

export default Header;