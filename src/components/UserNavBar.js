import Container from 'react-bootstrap/Container';
import './AdminNavBar.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Badge, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { toggleActions, cartActions } from "../store"
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './context/auth-context';
import banner from './../images/mindthecode.png'
import logo from './../images/eshop.png'

function UserNavBar() {

    const navigate = useNavigate();
    const quantity = useSelector((state) => state.cart.totalQuantity)
    const isVisible = useSelector(state => state.toggle.isVisible)

    const dispatch = useDispatch();

    const { user, logout } = useContext(AuthContext)

    const toggleHandler = () => {
        dispatch(toggleActions.toggleCart())
    }

    const handleLogout = () => {
        dispatch(cartActions.emptyCart());
        if (isVisible) dispatch(toggleActions.toggleCart())
        logout();
        navigate('/')

    }
    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Badge style={{ margin: '5px' }} bg="warning">Welcome, {user?.firstName}
                    </Badge>
                    <Navbar.Brand as={Link} to="/">MindTheCode</Navbar.Brand>
                    <Image style={{ width: '5%' }} src={logo}></Image>



                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/new-order">New Order</Nav.Link>

                        </Nav>




                        <Button onClick={toggleHandler} variant="primary"><span>My Cart</span> <Badge bg="danger">{quantity}
                        </Badge> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg></Button>
                        <Button variant="warning" onClick={handleLogout}>Logout</Button>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default UserNavBar;