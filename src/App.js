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
        {isLoggedIn && user.roles[0].name === 'ADMIN' ? <AdminNavBar></AdminNavBar> : <UserNavBar></UserNavBar>}
        {isVisible && <Cart />}

        <Routes>
          <Route path='/' element={<Home role={user?.roles[0].name} />} />
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
