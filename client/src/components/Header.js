import React from "react";
import { Navbar,Container,NavDropdown, Nav,Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import {RiAccountCircleFill } from "react-icons/ri";
import {FaHeart} from "react-icons/fa"
import { GrLogout,GrCart } from "react-icons/gr";




const Header = props => {


    const navigate = useNavigate();

    const Logout = () => {
       // localStorage.removeItem("tokenAdmin");
        navigate('/');
    }

    return(
        <Navbar bg="black" expand="lg">
        <Container fluid >
            <Navbar.Brand>
            <img src="../../Shope.jpg" style={{ width: 170}} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ background:'#fff'}} />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <div ><GrLogout className="btn btn-danger" onClick={Logout} size={50}  /></div>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default Header;