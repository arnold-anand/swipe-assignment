import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../redux/productSlice';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

const ProductSearch = ({ onProductSelect }) => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const products = useSelector(selectProducts);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setFilteredProducts([]);
    }
  };

  const handleProductClick = (product) => {
    onProductSelect(product);
    setSearchTerm('');
    setFilteredProducts([]);
  };

  return (
    <div className="product-search">
      
      <Form.Control
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search to add products..."
      />
      <Button className="mt-4" onClick={() => {navigate("/products")}}>Add New Item</Button>
      {filteredProducts.length > 0 && (
        <ListGroup>
          {filteredProducts.map((product) => (
            <ListGroup.Item
              key={product.id}
              action
              onClick={() => handleProductClick(product)}
            >
              {product.name} - {product.price}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default ProductSearch;
