import { useParams, Link, useNavigate } from "react-router-dom"
import { Row, Col, ListGroup, Image, ListGroupItem, Card, Button, Form, FormControl, FormLabel } from 'react-bootstrap'
import Loader from "../components/Loader"
import Rating from "../components/Rating"
import Message from "../components/Message"
import { useCreateReviewMutation, useGetProductByIdQuery } from '../slices/productsApiSlice'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../slices/cartSlice"
import { toast } from "react-toastify"

const ProductScreen = () => {
    const { id: productId } = useParams();
    // ************************* Important *********************************|
    // Must destructure isLoading and error and implement this in component |
    // *********************************************************************|
    const {data: product, isLoading, refetch, error} = useGetProductByIdQuery(productId);
    const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation();
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {userInfo} = useSelector(state => state.auth);

    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}));
        navigate('/cart');
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            await createReview({
                productId, rating, comment
            }).unwrap()
            refetch();
            toast.success('Review Submitted');
            setRating(0)
            setComment('')
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
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
                    <Row className="review">
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant="flush">
                                {product.reviews.map(review => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {loadingProductReview && <Loader />}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId="rating" className="my-2">
                                                <Form.Label>Rating</Form.Label>
                                                <FormControl as='select' value={rating}
                                                    onChange={(e) => setRating(Number(e.target.value))}>
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1-Poor</option>
                                                    <option value='2'>2-Fair</option>
                                                    <option value='3'>3-Good</option>
                                                    <option value='4'>4-Very Good</option>
                                                    <option value='5'>5-Excellent</option>
                                                </FormControl>
                                            </Form.Group>
                                            <Form.Group controlId="comment" className="my-2">
                                                <FormLabel>Comment</FormLabel>
                                                <FormControl as="textarea" value={comment} rows={3}
                                                    onChange={e => setComment(e.target.value)} />
                                            </Form.Group>
                                            <Button type='submit' disabled={loadingProductReview} variant="primary">
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            <Link to='/login'>Sign in</Link> to write a review.
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default ProductScreen