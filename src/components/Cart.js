import CartItem from "./CartItem"
import Card from './Card'
import { Button, Alert, InputGroup, Form, Modal } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import './Cart.css'
import './Card.css'
import { useState } from "react"
import { cartActions } from "../store"


const Cart = (props) => {
    const [address, setAddress] = useState("")
    const cartItems = useSelector((state) => state.cart.items)
    const totalPrice = useSelector((state) => state.cart.totalPrice)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const dispatch = useDispatch()

    const isEmpty = !cartItems.length
    const [error, setError] = useState(null)



    const handlePlaceOrder = (e) => {

        e.preventDefault();
        console.log(address, cartItems)
        const products = cartItems.map((product) => {
            return {
                productId: product.id,
                quantity: product.quantity
            }
        })

        const newOrder = {
            address,
            products
        }

        fetch(`http://localhost:8080/api/orders`, {
            method: 'POST',
            body: JSON.stringify(newOrder),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                dispatch(cartActions.emptyCart())
                setShow(true)
            })
            .catch(err => setError(err))

        console.log(JSON.stringify(newOrder))



    }
    return (
        <>
            <Card className='cart'>
                <Form onSubmit={handlePlaceOrder}>
                    <Alert style={{ fontSize: '25px' }}>Your Shopping Cart</Alert>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thank you!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Your order was placed succesfully!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {isEmpty && <Alert variant='warning'>
                        Your cart is empty. Add some products!                </Alert>}
                    <ul>
                        {cartItems.map((item) => {
                            return (<>
                                <CartItem key={item.id}
                                    item={{
                                        id: item.id,
                                        description: item.description,
                                        quantity: item.quantity,
                                        total: item.totalPrice,
                                        price: item.price,
                                    }}
                                />

                            </>
                            )
                        })}
                    </ul>

                    {!isEmpty &&
                        <>
                            <div className="row text-end" style={{ marginBottom: '10px' }}>
                                <div className="col">
                                    <h4 style={{ fontWeight: '800', color: 'brown' }}>Total Cost : €{totalPrice.toFixed(2)}</h4>
                                </div>
                            </div>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Shipping address</InputGroup.Text>
                                <Form.Control required value={address} onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter your address"
                                    aria-label="address"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <div className="row">
                                <Button type="submit" variant="warning">Place Order</Button>
                            </div>
                        </>

                    }
                </Form>
            </Card>

        </>

    )
}

export default Cart