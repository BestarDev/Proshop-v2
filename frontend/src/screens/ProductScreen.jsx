import { useParams, Link } from "react-router-dom"
import { Row, Col, ListGroup, Image, ListGroupItem, Card, Button } from 'react-bootstrap'
import Rating from "../components/Rating"
import { useGetProductByIdQuery } from '../slices/productsApiSlice'

const ProductScreen = () => {
    const { id: productId } = useParams();
    // Must destructure isLoading and error and implement this in component
    const {data: product, isLoading, error} = useGetProductByIdQuery(productId);

    return (
        <>
            {isLoading ? (<h1>Loading...</h1>)
            : error ? (<h1>Error occur</h1>)
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
                                    <ListGroup.Item>
                                        <Button className='btn-block'
                                            type='button'
                                            disabled={product.countInStock === 0}
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