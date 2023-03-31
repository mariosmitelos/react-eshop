import { useEffect, useState, useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux"
import { cartActions, toggleActions } from "../store"
import { useSelector } from "react-redux"
import AuthContext from "./context/auth-context";
import Cart from "./Cart";

function OrderForm() {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)
    const [description, setDescription] = useState('')
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(3)
    const [sort, setSort] = useState("ASC")

    const [totalPages, setTotalPages] = useState(0)
    const [number, setNumber] = useState(0)
    const [totalElements, setTotalElements] = useState(0)

    const dispatch = useDispatch()
    const isVisible = useSelector((state) => state.toggle.isVisible)
    const { isLoggedIn, user } = useContext(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:8080/api/products?page=${page}&size=${size}&sort=${sort}` + (description ? `&description=${description}` : ''))
            .then((res) => res.json())
            .then(page => {
                const {
                    content,
                    number,
                    totalElements,
                    totalPages
                } = page;
                setNumber(number)
                setTotalPages(totalPages)
                setProducts(content)
                setTotalElements(totalElements)
            })
            .catch(err => setError(err))
    }, [description, page, size, sort, number])


    const addToCartHandler = (product) => {
        dispatch(cartActions.addProduct({ id: product.id, name: product.name, description: product.description, price: product.price }))
        if (!isVisible) dispatch(toggleActions.toggleCart())
    }


    if (isLoggedIn && user?.roles[0].name === 'CUSTOMER') {

        return (<>

            {isVisible && <Cart />}

            <main style={{ marginTop: '56px' }} className="container pt-5">

                <h1>Buy your favourite products</h1>

                <div className="row mt-5">
                    <div className="col">
                        <input value={description} onChange={(e) => setDescription(e.target.value)} name="description" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    </div>
                    <div className="col-4">
                        <select defaultValue={sort} onChange={(e) => { setSort(e.target.value) }} className="form-select" aria-label="Default select example">
                            <option value="ASC">Sort by Description: Ascending</option>
                            <option value="DESC">Sort by Description: Descending</option>
                        </select>
                    </div>
                </div>


                <table className="table table-hover">

                    <thead>

                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                        </tr>

                    </thead>

                    <tbody>
                        {products ?
                            products.map(product => (
                                <tr key={product.id}>
                                    <th scope="row">{product.id}</th>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>€{product.price}</td>
                                    <td>
                                        <div className="row" style={{ width: '190px' }}>
                                            <div className="col">
                                                <Button onClick={() => addToCartHandler(product)} variant="success">Add to Cart</Button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )) : <div className="row">
                                <div className="col text-center"><span>No products found. Add some products to see and manage them here by clicking the "Add new product" button</span></div>
                            </div>
                        }



                    </tbody>

                </table>

                {
                    totalPages > 0 ? (
                        <div className="row justify-content-between">
                            <div className='col-3'>
                                <Form.Select defaultValue={size} onChange={(e) => setSize(e.target.value)}>
                                    <option value={3}>Page size: 3</option>
                                    <option value={10}>Page size: 10</option>
                                    <option value={20}>Page size: 20</option>
                                </Form.Select>
                            </div>
                            <div className="col-3 d-flex flex-column justify-content-center align-items-center">
                                <span>{'Now on ' + (number + 1) + ' from total ' + totalPages + ' pages'}</span>
                                <span>{'(Total ' + totalElements + ' products)'}</span>
                            </div>
                            <div className="col-3 d-flex justify-content-end">
                                <nav>
                                    <ul className="pagination" style={{ cursor: 'pointer' }}>

                                        <li className={number === 0 ? 'disabled page-item' : 'page-item'}>
                                            <a className="page-link" onClick={(e) => { e.preventDefault(); setPage(number - 1) }}>
                                                Previous</a>
                                        </li>

                                        {
                                            number > 0 ? (
                                                <li className="page-item">
                                                    <a className="page-link" onClick={(e) => { e.preventDefault(); setPage(number - 1) }}>{number}</a>
                                                </li>
                                            ) : null
                                        }


                                        <li className="page-item active">
                                            <a className="page-link" href="#">{number + 1}</a>
                                        </li>

                                        {
                                            number < totalPages - 1 ? (
                                                <li className="page-item">
                                                    <a className="page-link" onClick={(e) => { e.preventDefault(); setPage(number + 1) }}>{number + 2}</a>
                                                </li>
                                            ) : null
                                        }

                                        <li className={number === totalPages - 1 ? 'disabled page-item' : 'page-item'}>
                                            <a className="page-link" onClick={(e) => { e.preventDefault(); setPage(number + 1) }}>
                                                Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            <div className="col text-center"><span>No Data</span></div>
                        </div>
                    )
                }

                {
                    error ? (
                        <div className="row">
                            <div className="col text-center text-error"><span>Error: {error}</span></div>
                        </div>
                    ) : null
                }

            </main>

        </>
        )

    }
    if (isLoggedIn && user?.roles[0].name === 'ADMIN') {
        return (<Alert variant="danger">Oops, sorry Admin, Login as a customer if you want to place an order!</Alert>)

    }
}

export default OrderForm;