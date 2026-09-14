import { useEffect, useState} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'
import ProductAdd  from './Dashboard/ProductAdd.jsx';



function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <BrowserRouter>

    <Link to="/addProduct">Add Product</Link>

    <Routes>
      <Route path="/addProduct" element={<ProductAdd />} />
        
    
      </Routes>

      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>Price: ₹{product.price}</p>
        </div>
      ))}
    </BrowserRouter>
  );
}

export default App;

