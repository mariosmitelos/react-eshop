import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function ProductList() {

    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [description, setDescription] = useState('')
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(3)
    const [sort, setSort] = useState("ASC")

    const [totalPages, setTotalPages] = useState(0)
    const [number, setNumber] = useState(0)
    const [totalElements, setTotalElements] = useState(0)
    const [refresh, setRefresh] = useState(0)

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
    }, [description, page, size, sort, refresh, number])

    const deleteProduct = useCallback((id) => {
        fetch(`http://localhost:8080/api/products/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                setRefresh(refresh + 1)
            })
            .catch(err => setError(err))
    }, [refresh])


    return (<>



        <main style={{ marginTop: '56px' }} className="container pt-5">

            <h1>Products</h1>

            <div className="row mt-5">
                <div className="col-2">
                    <button className="btn btn-primary" form="new-product" onClick={() => { navigate('/edit') }} >Add New Product</button>

                </div>
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
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Options</th>
                    </tr>

                </thead>

                <tbody>
                    {products ?
                        products.map(product => (
                            <tr key={product.id}>
                                <th scope="row">{product.id}</th>
                                <td>{product.description}</td>
                                <td>€{product.price}</td>
                                <td>
                                    <div className="row" style={{ width: '190px' }}>
                                        <div className="col">
                                            <NavLink to={`/edit/${product.id}`} className="btn btn-light">Edit</NavLink>
                                        </div>
                                        <div className="col">
                                            <button onClick={() => deleteProduct(product.id)} type="button" className="btn btn-danger">Delete</button>
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

export default ProductList;