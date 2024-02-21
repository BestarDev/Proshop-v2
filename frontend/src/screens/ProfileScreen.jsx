import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Form, FormLabel, Row, Button, Table} from 'react-bootstrap'
import { useProfileMutation } from '../slices/usersApiSlice'
import { setCredential } from '../slices/authSlice'
import { FaTimes } from 'react-icons/fa'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { toast } from 'react-toastify'
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice'
import Message from '../components/Message'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.auth);

  const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();
  const {data: orders, isLoading, error} = useGetMyOrdersQuery();

  useEffect(() => {
    if(userInfo) {
      setName(userInfo.name)
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email])

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword ) {
      toast.error('Password do not match')
    } else {
      try {
        const res = await updateProfile({_id: userInfo._id, name, email, password}).unwrap();
        dispatch(setCredential(res));
        toast.success('Profile Updated Successfully')
      } catch (err) {
        toast.error(err?.data?.message || err?.message || err);
      }
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' className='my-2'>
            <FormLabel>Name</FormLabel>
            <Form.Control type='text' value={name} placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId='email' className='my-2'>
            <FormLabel>Email</FormLabel>
            <Form.Control type='email' value={email} placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId='password' className='my-2'>
            <FormLabel>Password</FormLabel>
            <Form.Control type='password' value={password} placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group controlId='confirmPassword' className='my-2'>
            <FormLabel>Confirm Password</FormLabel>
            <Form.Control type='password' value={confirmPassword} placeholder='Confirm Your Password' onChange={(e) => setConfirmPassword(e.target.value)} />
          </Form.Group>
          <Button type='submit' variant='primary' className='my-2'>
            Update
          </Button>
          { loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {isLoading ? <Loader /> : 
        error ? <Message variant='danger'>
          {error?.data?.message || error.error }
        </Message> : (
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>{order.isPaid ? order?.paidAt.substring(0, 10) : < FaTimes style={{color: 'red'}}/> }</td>
                  <td>{order.isDelivered ? order?.deliveredAt.substring(0, 10) : <FaTimes style={{color: 'red'}}/> }</td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen