import { useDispatch } from "react-redux"
import { cartActions } from "../store"
import './CartItem.css'

const CartItem = (props) => {
    const { id, description, quantity, price, total } = props.item

    const dispatch = useDispatch()

    const addQuantityHandler = (e) => {
        e.preventDefault();
        dispatch(cartActions.addQuantity(id))
    }
    const removeQuantityHandler = (e) => {
        e.preventDefault();
        dispatch(cartActions.deleteProduct(id))
    }

    console.log(description)

    return (
        <li className='item'>
            <header>
                <h3>{description}</h3>
                <div className='price'>
                    €{total.toFixed(2)}
                    <span className='itemprice'>(€{price.toFixed(2)}/item)</span>
                </div>
            </header>
            <div className='details'>
                <div className='quantity'>
                    x <span>{quantity}</span>
                </div>
                <div className='actions'>
                    <button onClick={(e) => removeQuantityHandler(e)}>-</button>
                    <button onClick={(e) => addQuantityHandler(e)}>+</button>
                </div>
            </div>
        </li>
    )
}

export default CartItem