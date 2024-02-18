import React, { useState, useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import { Form, FormControl, FormGroup, FormLabel, Button, Row, Col } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../slices/usersApiSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCredential } from '../slices/authSlice';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ registerApiCall, { isLoading }]= useRegisterMutation();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect');

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if(userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate])

    const registerHandler = async(e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Passwords do not match')
            return;
        } else {
            try {
                const user = await registerApiCall({name, email, password}).unwrap();
                dispatch(setCredential(user));
                redirect ? navigate(redirect) : navigate('/');
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    }

    return (
        <FormContainer>
            <h1>Register</h1>
            <Form onSubmit={registerHandler}>
                <FormGroup controlId='name' className='my-3'>
                    <FormLabel>User Name</FormLabel>
                    <FormControl
                        type='text'
                        placeholder='Enter your name'
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </FormGroup>
                <FormGroup controlId='email' className='my-3'>
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        type='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup controlId='password' className='my-3'>
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup controlId='confirmPassword' className='my-3'>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        type='password'
                        placeholder='Confirm your password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                </FormGroup>
                <Button type='submit' className='mt-2'>Register</Button>

                {isLoading && <Loader />}
            </Form>
            <Row>
                <Col>
                    Already have an account? <Link to={redirect? `/login?redirect=${redirect}`:'/login'}>Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen