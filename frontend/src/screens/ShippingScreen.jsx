import { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../slices/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = () => {
    const { shippingAddress } = useSelector(state => state.cart);

    const [address, setAddress] = useState(shippingAddress?.address || '')
    const [city, setCity] = useState(shippingAddress?.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '')
    const [country, setCountry] = useState(shippingAddress?.country || '')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment');
    }

    return (
        <FormContainer>
            <h1 className='my-3'>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='address' id='address' className='my-2'>
                    <FormLabel>Address</FormLabel>
                    <FormControl type='text' value={address} placeholder='Enter Your Address'
                        onChange={(e) => setAddress(e.target.value)} />
                </FormGroup>
                <FormGroup controlId='city' id='city' className='my-2'>
                    <FormLabel>City</FormLabel>
                    <FormControl type='text' value={city} placeholder='Enter Your City'
                        onChange={(e) => setCity(e.target.value)} />
                </FormGroup>
                <FormGroup controlId='postalCode' id='postalCode' className='my-2'>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl type='text' value={postalCode} placeholder='Enter Your Postal Code'
                        onChange={(e) => setPostalCode(e.target.value)} />
                </FormGroup>
                <FormGroup controlId='country' id='country' className='my-2'>
                    <FormLabel>Country</FormLabel>
                    <FormControl type='text' value={country} placeholder='Enter Your Country'
                        onChange={(e) => setCountry(e.target.value)} />
                </FormGroup>
                <Button type='submit' variant='primary' className='my-2'>Continue</Button>
            </Form>
            <CheckoutSteps step={2} />
        </FormContainer>
    )
}

export default ShippingScreen