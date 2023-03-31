import Container from 'react-bootstrap/Container';
import './AdminNavBar.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from './context/auth-context';
import { useContext } from 'react';

function AdminNavBar() {

    const { logout } = useContext(AuthContext)

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">MindTheCode e-Shop</Navbar.Brand>
                    <Badge bg="warning">Admin
                    </Badge>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/products">Products</Nav.Link>
                            <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                        </Nav>
                        <Button variant="warning" onClick={() => logout()}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default AdminNavBar;