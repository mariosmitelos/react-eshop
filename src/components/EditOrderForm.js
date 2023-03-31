import React from "react";
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from "react";


function EditOrderForm() {
    const { id } = useParams();
    const [order, setOrder] = useState(null)
    const [refresh, setRefresh] = useState(0)
    const [err, setError] = useState(null)
    const navigate = useNavigate()
    // const quantityRefs = useRef([...new Array(location.totalOrders)].map(() => React.createRef()))




    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/api/orders/${id}`)
                .then((res) => res.json())
                .then(order => {
                    setOrder(order)


                })
                .catch(err => setError(err))
        }
    }, [id, refresh])


    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (id) {
            fetch(`http://localhost:8080/api/orders/${id}`, {
                method: 'PUT',
                body: JSON.stringify(order),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {
                    setRefresh(refresh + 1);
                    navigate('/orders')
                })
                .catch(err => setError(err))
        }
        // else {
        //     if (product.description && product.price) {
        //         fetch(`http://localhost:8080/api/products`, {
        //             method: 'POST',
        //             body: JSON.stringify(product),
        //             headers: {
        //                 'Accept': 'application/json',
        //                 'Content-Type': 'application/json'
        //             }
        //         })
        //             .then(() => {
        //                 setRefresh(refresh + 1);
        //                 navigate('/products')
        //             })
        //             .catch(err => setError(err))

        //     }
        // }
    }, [id, refresh, order, navigate])

    const handleQuantityChange = (e, index) => {

    }



    return (
        <>
            <main style={{ marginTop: '56px' }} className="container pt-5">
                {
                    order ? (
                        <>
                            {
                                order.id ? (
                                    <h1> Edit Order #{order.id}</h1>
                                ) : (
                                    <h1> Order not found </h1>
                                )
                            }
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label><b>Address</b></Form.Label>
                                    <Form.Control type="text"
                                        className="input"
                                        value={order.address}
                                        onChange={e => setOrder({ ...order, address: e.target.value })}
                                        placeholder="Enter description" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label style={{ marginTop: '10px' }}><b>Products</b></Form.Label>
                                    {order.products?.map((product, index) => {
                                        return (
                                            <>
                                                <Form.Control type="text"
                                                    className="input"

                                                    value={`${product.description} - Quantity: ${product.quantity}`}
                                                    disabled
                                                />


                                                <Form.Control type="number"
                                                    className="input"
                                                    onChange={(e) => handleQuantityChange(e, index)}
                                                    placeholder="Enter new quantity" />
                                                <br />
                                            </>
                                        )
                                    })}

                                </Form.Group>
                                <Button variant="primary mt-3" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </>

                    ) : null
                }
            </main>
        </>


    );
}

export default EditOrderForm;