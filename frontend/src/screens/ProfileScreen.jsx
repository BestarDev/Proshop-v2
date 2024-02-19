import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Form, FormLabel, Row, Button} from 'react-bootstrap'
import { useProfileMutation } from '../slices/usersApiSlice'
import { setCredential } from '../slices/authSlice'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.auth);

  const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();

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
    </Row>
  )
}

export default ProfileScreen