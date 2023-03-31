import './App.css';
import AdminNavBar from './components/AdminNavBar';
import ProductList from './components/ProductList';
import { useSelector } from "react-redux"
import EditProductForm from './components/EditProductForm';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import Orders from './components/Orders';
import Login from './components/Login';
import Home from './components/Home';
import { useContext } from 'react';
import AuthContext from './components/context/auth-context';

import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import UserNavBar from './components/UserNavBar';
import EditOrderForm from './components/EditOrderForm';


function App() {

  const isVisible = useSelector((state) => state.toggle.isVisible)
  const { isLoggedIn, user } = useContext(AuthContext)

  return (
    <>
      <BrowserRouter>

        {!isLoggedIn && <Login />}
        {isLoggedIn && user?.roles[0].name === 'ADMIN' && <AdminNavBar></AdminNavBar>}
        {isLoggedIn && user?.roles[0].name === 'CUSTOMER' && <UserNavBar></UserNavBar>}
        {/* {isVisible && user?.roles[0].name === 'CUSTOMER' && <Cart />} */}
        <Routes>
          {/* <Route path="/" element={<h2 style={{ textAlign: 'center', marginTop: '50px' }}>Welcome to the Admin Panel. Select one from the options above</h2>} /> */}
          <Route path='/' element={<Home />} />
          <Route path='/orders' element={<Orders />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/edit/product/:id?" element={<EditProductForm />} />
          <Route path="/edit/order/:id?" element={<EditOrderForm />} />
          <Route path="/new-order" element={<OrderForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
