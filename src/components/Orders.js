import { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AuthContext from './context/auth-context';


function Orders() {

    const [orders, setOrders] = useState([])
    const [error, setError] = useState(null)
    const [address, setAddress] = useState('')
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    const [sort, setSort] = useState("ASC")

    const [totalPages, setTotalPages] = useState(0)
    const [number, setNumber] = useState(0)
    const [totalElements, setTotalElements] = useState(0)
    const [refresh, setRefresh] = useState(0)

    const { isLoggedIn, user } = useContext(AuthContext)


    useEffect(() => {
        fetch(`http://localhost:8080/api/orders?page=${page}&size=${size}&sort=${sort}` + (address ? `&description=${address}` : ''))
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
                setOrders(content)
                setTotalElements(totalElements)
            })
            .catch(err => setError(err))
    }, [address, page, size, sort, refresh, number])

    const deleteOrder = useCallback((id) => {
        console.log(id)
        fetch(`http://localhost:8080/api/orders/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                setRefresh(refresh + 1)
            })
            .catch(err => setError(err))
    }, [refresh])


    if (isLoggedIn && user?.roles[0].name === 'ADMIN') {
        return (<>


            <main style={{ marginTop: '56px' }} className="container pt-5">

                <h1>Orders</h1>

                <div className="row mt-5">

                    <div className="col">
                        <input value={address} onChange={(e) => setAddress(e.target.value)} name="description" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    </div>
                    <div className="col-4">
                        <select defaultValue={sort} onChange={(e) => { setSort(e.target.value) }} className="form-select" aria-label="Default select example">
                            <option value="ASC">Sort by Address: Ascending</option>
                            <option value="DESC">Sort by Address: Descending</option>
                        </select>
                    </div>
                </div>


                <table className="table table-hover">

                    <thead>

                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Address</th>
                            <th scope="col">Products</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total Order Price</th>
                        </tr>

                    </thead>

                    <tbody>
                        {orders ?
                            orders.map(order => {
                                return (
                                    <tr style={{ verticalAlign: 'middle' }} key={order.id}>
                                        <th scope="row">{order.id}</th>
                                        <td>{order.address}</td>
                                        <td>{order.products.map((product) => {
                                            return (
                                                <div>{product.description} </div>
                                            )
                                        })}</td>
                                        <td>{order.products.map((product) => {
                                            return (
                                                <div>{product.quantity} </div>
                                            )
                                        })}</td>
                                        <td>€{order.totalCost}</td>
                                        <td>
                                            <div className="row" style={{ width: '190px' }}>
                                                <div className="col">
                                                    <NavLink to={`/edit/order/${order.id}`} className="btn btn-light">Edit</NavLink>
                                                </div>
                                                <div className="col">
                                                    <button onClick={() => deleteOrder(order.id)} type="button" className="btn btn-danger">Delete</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }) : <div className="row">
                                <div className="col text-center"><span>No orders found.</span></div>
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

    else {
        return (<Alert variant="danger">Oops, you don't have access to this page!</Alert>)
    }
}

export default Orders;