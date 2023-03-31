import { configureStore, createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addProduct(state, action) {
            const newItem = action.payload
            const exists = state.items.find((item) => item.id === newItem.id)
            state.totalQuantity++;
            state.totalPrice += newItem.price;
            if (!exists) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    description: newItem.description,
                    name: newItem.name
                })
            } else {
                exists.quantity++
                exists.totalPrice += newItem.price
            }
        },
        deleteProduct(state, action) {
            const id = action.payload
            const exists = state.items.find((item) => item.id === id)
            state.totalQuantity--
            state.totalPrice -= exists.price;

            if (exists.quantity === 1) {
                state.items = state.items.filter((product) => product.id !== id)

            } else {
                exists.quantity--
                exists.totalPrice -= exists.price


            }
        },
        addQuantity(state, action) {
            const item = state.items.find((item) => action.payload === item.id)
            item.quantity++
            state.totalQuantity++
            item.totalPrice += item.price
            state.totalPrice += item.price;
        },
        emptyCart(state, action) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        }
    },
})

const toggleSlice = createSlice({
    name: "toggle",
    initialState: { isVisible: false },
    reducers: {
        toggleCart(state) {
            state.isVisible = !state.isVisible
        },
    },
})

const store = configureStore({
    reducer: { cart: cartSlice.reducer, toggle: toggleSlice.reducer },
})

export const toggleActions = toggleSlice.actions
export const cartActions = cartSlice.actions
export default store