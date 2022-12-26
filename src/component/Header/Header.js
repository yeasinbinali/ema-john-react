import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import './Header.css'
import logo from '../../images/Logo.svg'


const Header = () => {
    return (
        <nav>
            <Navbar className='navbar'>
            <Container>
                <img src={logo} alt='img-failed'/>
                <Nav>
                    <a href="#home">Home</a>
                    <a href="#orders">Orders</a>
                    <a href="#login">Login</a>
                </Nav>
            </Container>
            </Navbar>
        </nav>
    );
};

export default Header;