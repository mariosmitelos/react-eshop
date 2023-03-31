import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "./context/auth-context";
import { useContext } from "react";
import Cart from "./Cart";
import { useSelector } from "react-redux";


function Home() {

    const { isLoggedIn, user } = useContext(AuthContext)
    const isVisible = useSelector((state) => state.toggle.isVisible)



    if (isLoggedIn && user?.roles[0].name === 'ADMIN') {
        return (
            <>
                <div className="row" style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="col">
                        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Welcome to the Admin Panel. Select one from the options above or below</h2>
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Button style={{ margin: '5px' }} as={Link} to="/products">Products</Button>
                    <Button style={{ margin: '5px' }} as={Link} to="/orders">Orders</Button>

                </div>



            </>
        )
    }

    if (isLoggedIn && user?.roles[0].name === 'CUSTOMER') {

        return (
            <>
                {isVisible && <Cart />}

                <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Welcome to MindTheCode eShop! Select New Order above to place your order</h2>
            </>
        )
    }
}

export default Home