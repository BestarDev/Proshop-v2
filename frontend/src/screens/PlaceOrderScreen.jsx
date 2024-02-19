import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import Message from "../components/Message";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import Loader from '../components/Loader';
import { clearCartItems } from "../slices/cartSlice";


const PlaceOrderScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart);

    useEffect(() => {
        if(!cart.shippingAddress?.address) {
            navigate('/shipping')
        } else if(!cart.paymentMethod) {
            navigate('/payment')
        }
    }, [cart.shippingAddress, cart.paymentMethod, navigate]);

    const {shippingAddress: sp} = cart;
    const [createOrder, {isLoading, error}] = useCreateOrderMutation();

    const placeOrderHandler = async() => {
        try{
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: sp,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch(err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <>
            <CheckoutSteps step={4} />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h1>Shipping</h1>
                            <strong>Address: </strong>
                            {sp.address}, {sp.city}, {sp.postalCode}, {sp.country}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h1>Payment</h1>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            { cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((x, idx) => (
                                        <ListGroup.Item key={idx}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={x.image} alt={x.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/products/${x._id}`}>{x.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {x.qty} * ${x.price} = ${Number((x.qty * x.price).toFixed(2))}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {error && (
                                <ListGroup.Item>
                                    <Message variant='danger'>{error}</Message>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button type='button' className="btn-block"
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >Place Order</Button>
                            </ListGroup.Item>
                            {isLoading && <Loader />}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen