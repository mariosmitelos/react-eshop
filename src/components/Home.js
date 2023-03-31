import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "./context/auth-context";
import { useContext } from "react";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import Image from 'react-bootstrap/Image'
import banner from './../images/mindthecode.png'


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

                <div className="row justify-content-center">
                    <Image style={{ marginTop: '20px', width: '60%' }} src={banner} fluid></Image>
                </div>



            </>
        )
    }

    if (isLoggedIn && user?.roles[0].name === 'CUSTOMER') {

        return (
            <>
                {isVisible && <Cart />}

                <div className="row justify-content-center">
                    <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Welcome to MindTheCode eShop! Select New Order above to place your order</h2>
                    <Image style={{ marginTop: '20px', width: '60%' }} src={banner} fluid></Image>
                </div>


            </>
        )
    }
}

export default Home