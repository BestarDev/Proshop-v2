import React, { useEffect } from 'react'
import { useGetProductsQuery } from '../../slices/productsApiSlice'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { LinkContainer } from 'react-router-bootstrap';

const ProductListScreen = () => {
    const {data: products, isLoading, error } = useGetProductsQuery();

    const deleteHandler = (id) => {
        console.log(id);
    }
    
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='btn-sm m-e'>
                        <FaEdit /> Create Product
                    </Button>
                </Col>
            </Row>
            {isLoading ? <Loader /> : 
            error ? <Message variant='danger'>{error?.data?.message || error.error }</Message> : (
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm mx-2'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='warning' className='btn-sm'
                                        onClick={() => deleteHandler(product._id)}>
                                        <FaTrash style={{color:'white'}}/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default ProductListScreen