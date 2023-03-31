import Container from 'react-bootstrap/Container';
import './AdminNavBar.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Badge, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from './context/auth-context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './../images/eshop.png'

function AdminNavBar() {

    const { logout } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/')
    }

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Badge style={{ margin: '5px' }} bg="warning">Admin
                    </Badge>
                    <Navbar.Brand as={Link} to="/">MindTheCode</Navbar.Brand>
                    <Image style={{ width: '5%' }} src={logo}></Image>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/products">Products</Nav.Link>
                            <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                        </Nav>
                        <Button variant="warning" onClick={handleLogout}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default AdminNavBar;