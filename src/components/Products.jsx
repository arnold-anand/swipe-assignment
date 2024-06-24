import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, editProduct } from '../redux/productSlice';
import { Link, useNavigate} from 'react-router-dom';


function Products() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  const [currentProduct, setCurrentProduct] = useState({ id: null, name: '', price: '' });
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const handleClose = () => {
    setShow(false);
    setIsEditing(false);
    setCurrentProduct({ id: null, name: '', price: '' });
  };

  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(editProduct(currentProduct));
    } else {
      dispatch(addProduct({ ...currentProduct, id: products.length + 1 }));
    }
    handleClose();
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    handleShow();
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div>
        <div className='d-flex gap-5'>
        <Link onClick={() => { navigate(-1) }}>Go Back</Link>
        <Link className='' to="/">Home</Link>
        </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td className="d-flex gap-2">
                <Button variant="primary" onClick={() => handleEdit(product)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(product.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="primary" onClick={handleShow}>
        Add Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{isEditing ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                value={currentProduct.name}
                onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                placeholder="Enter Item Name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Selling Price</Form.Label>
              <Form.Control
                type="number"
                value={currentProduct.price}
                onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                placeholder="Enter Selling Price"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Products;
