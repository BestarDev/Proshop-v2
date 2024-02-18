import { Form, FormControl, FormGroup, FormLabel, Button, Row, Col } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useLoginMutation } from "../slices/usersApiSlice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { setCredential } from "../slices/authSlice"
import Loader from "../components/Loader"

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect'); 

    // useEffect(() => {
    //     if(userInfo) {
    //         navigate(redirect);
    //     }
    // }, [userInfo, redirect])

    const loginHandler = async(e) => {
        e.preventDefault();
        try {
            const res = await login({email, password}).unwrap();
            dispatch(setCredential({...res}))
            redirect ? navigate(redirect) : navigate('/');
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={(e) => loginHandler(e)}>
                <FormGroup controlId="email" className="my-3">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlId="password" className="my-3">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <Button type='submit' variant='primary' className='mt-2' disabled={isLoading}>
                    Sign In
                </Button>

                {isLoading && <Loader />}
            </Form>
            <Row className='py-3'>
                <Col>
                    New customer? <Link to={ redirect ? `/register?=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen