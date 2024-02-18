import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../slices/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shippingAddress } = useSelector(state => state.cart);

    useEffect(() => {
        if(!shippingAddress){
            navigate('/shipping');
        }
    }, [shippingAddress, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder'); 
    }
    return (
        <FormContainer>
            <h1>Payment</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Payment Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            className='my-2'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
            <CheckoutSteps step={3} />
        </FormContainer>
    )
}

export default PaymentScreen