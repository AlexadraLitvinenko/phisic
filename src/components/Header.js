import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';

const Header = () => {
   
    return (
        <div id='Header'>
            <Navbar className="nav" bg="dark" variant="dark">
                <Navbar.Brand className="nav-elem" href="/">Физика для школьников</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link className="nav-elem" href="/">Главная</Nav.Link>
                <Nav.Link className="nav-elem" href="/about">О нас</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    )
}
export default Header;
