import './App.css';
import AdminNavBar from './components/AdminNavBar';
import ProductList from './components/ProductList';
import { useSelector } from "react-redux"
import EditProductForm from './components/EditProductForm';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import Orders from './components/Orders';


import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import UserNavBar from './components/UserNavBar';


function App() {

  const isVisible = useSelector((state) => state.toggle.isVisible)

  return (
    <>
      <BrowserRouter>
        <AdminNavBar></AdminNavBar>
        <UserNavBar></UserNavBar>
        {isVisible && <Cart />}

        <Routes>
          <Route path="/" element={<h2 style={{ textAlign: 'center', marginTop: '50px' }}>Welcome to the Admin Panel. Select one from the options above</h2>} />
          <Route path='/orders' element={<Orders />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/edit/:id?" element={<EditProductForm />} />
          <Route path="/new-order" element={<OrderForm />} />
        </Routes>
      </BrowserRouter>
      {/* <ProductList></ProductList> */}
    </>
  );
}

export default App;
