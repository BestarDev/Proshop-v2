import { useParams, Link, useNavigate } from "react-router-dom"
import { Row, Col, ListGroup, Image, ListGroupItem, Card, Button, Form } from 'react-bootstrap'
import Loader from "../components/Loader"
import Rating from "../components/Rating"
import Message from "../components/Message"
import { useGetProductByIdQuery } from '../slices/productsApiSlice'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addToCart } from "../slices/cartSlice"

const ProductScreen = () => {
    const { id: productId } = useParams();
    // ************************* Important *********************************|
    // Must destructure isLoading and error and implement this in component |
    // *********************************************************************|
    const {data: product, isLoading, error} = useGetProductByIdQuery(productId);
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}));
        navigate('/cart');
    }

    return (
        <>
            {isLoading ? (<Loader />)
            : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>)
            : (
                <>
                    <Link to='/' className='btn btn-light my-3'>
                        Go Back
                    </Link>
                    <Row>
                        <Col md={5}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                </ListGroup.Item>
                                <ListGroupItem>
                                    Price: ${product.price}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {
                                        product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row className="align-items-center">
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control as='select'
                                                            value={qty}
                                                            onChange={(e) => setQty(Number(e.target.value))}
                                                        >
                                                            {[...Array(product.countInStock).keys()].map(x => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    }
                                    <ListGroup.Item>
                                        <Button className='btn-block'
                                            type='button'
                                            disabled={product.countInStock === 0}
                                            onClick={addToCartHandler}
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>        
                    </Row>
                </>
            )}
        </>
    )
}

export default ProductScreen