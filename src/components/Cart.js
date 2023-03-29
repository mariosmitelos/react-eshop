import CartItem from "./CartItem"
import Card from './Card'
import { Button, Alert, InputGroup, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import './Cart.css'
import './Card.css'
import { useState } from "react"

const Cart = (props) => {
    const [address, setAddress] = useState("")
    const cartItems = useSelector((state) => state.cart.items)
    const totalPrice = useSelector((state) => state.cart.totalPrice)
    const isEmpty = !cartItems.length



    const handlePlaceOrder = (e) => {

        e.preventDefault();
        console.log(address, cartItems)
        const newOrder = {
            address: address,
            cartItems
        }

        console.log(JSON.stringify(newOrder))



    }
    return (
        <>
            <Card className='cart'>
                <Form onSubmit={handlePlaceOrder}>
                    <Alert style={{ fontSize: '25px' }}>Your Shopping Cart</Alert>
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
                                    <h4 style={{ fontWeight: '800', color: 'brown' }}>Total Cost : €{totalPrice}</h4>
                                </div>
                            </div>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Shipping address</InputGroup.Text>
                                <Form.Control value={address} onChange={(e) => setAddress(e.target.value)}
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