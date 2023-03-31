import React from "react";
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback, useContext } from "react";
import AuthContext from "./context/auth-context";


function EditProductForm() {
    const { id } = useParams();
    const [product, setProduct] = useState(null)
    const [refresh, setRefresh] = useState(0)
    const [err, setError] = useState(null)
    const { isLoggedIn, user } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/api/products/${id}`)
                .then((res) => res.json())
                .then(p => {
                    setProduct(p)
                })
                .catch(err => setError(err))
        } else {
            setProduct({ name: '', description: '', price: '' })
        }
    }, [id, refresh])

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (id) {
            fetch(`http://localhost:8080/api/products/${id}`, {
                method: 'PUT',
                body: JSON.stringify(product),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {
                    setRefresh(refresh + 1);
                    navigate('/products')
                })
                .catch(err => setError(err))
        } else {
            if (product.description && product.price) {
                fetch(`http://localhost:8080/api/products`, {
                    method: 'POST',
                    body: JSON.stringify(product),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(() => {
                        setRefresh(refresh + 1);
                        navigate('/products')
                    })
                    .catch(err => setError(err))

            }
        }
    }, [id, refresh, product, navigate])


    if (isLoggedIn && user?.roles[0].name === 'ADMIN') {
        return (
            <>
                <main style={{ marginTop: '56px' }} className="container pt-5">
                    {
                        product ? (
                            <>
                                {
                                    product.id ? (
                                        <h1> Edit product #{product.id}</h1>
                                    ) : (
                                        <h1> Create a new product</h1>
                                    )
                                }
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label><b>Name</b></Form.Label>
                                        <Form.Control type="text"
                                            className="input"
                                            value={product.name}
                                            onChange={e => setProduct({ ...product, name: e.target.value })}
                                            placeholder="Enter name" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label><b>Description</b></Form.Label>
                                        <Form.Control type="text"
                                            className="input"
                                            value={product.description}
                                            onChange={e => setProduct({ ...product, description: e.target.value })}
                                            placeholder="Enter description" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label><b>Price</b></Form.Label>
                                        <Form.Control type="number" min={0} step="0.01"
                                            className="input"
                                            value={product.price}
                                            onChange={e => setProduct({ ...product, price: e.target.value })}
                                            placeholder="Enter price" />
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
    else {


        return (<Alert variant="danger">Oops, you don't have access to this page!</Alert>)
    }
}

export default EditProductForm;