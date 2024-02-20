import React, { useEffect, useState } from 'react'
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../slices/usersApiSlice'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { toast } from 'react-toastify';

const UserEditScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false);
    const {id: userId} = useParams();
    const {data: user, isLoading, error} = useGetUserByIdQuery(userId);
    const [updateUser, {isLoading: loadingUpdate}] = useUpdateUserMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user])

    const submitHandler = async(e) => {
        e.preventDefault();
        console.log(isAdmin);
        try {
            const updatedUser = {
                _id: userId, name, email, isAdmin
            }
            const res = await updateUser({userId, userData:{...updatedUser}})
            toast.success('Updated Successfully');
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
        navigate('/admin/userlist');
    }
    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            {loadingUpdate && <Loader />}
            {isLoading ? <Loader /> : 
            error ? <Message variant='danger'>{error?.data?.message || error.error }</Message> : (
                <FormContainer>
                    <Form onSubmit={submitHandler}>
                        <h1>Edit User</h1>
                        <FormGroup controlId='username' className='my-1'>
                            <FormLabel>Name</FormLabel>
                            <FormControl type='text' value={name} onChange={(e) => setName(e.target.value)} />
                        </FormGroup>
                        <FormGroup controlId='email' className='my-1'>
                            <FormLabel>Email</FormLabel>
                            <FormControl type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormGroup>
                        <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(!isAdmin)} className='my-2'/>
                        <Button type='submit' className='btn btn-block my-2'>Update</Button>
                    </Form>
                </FormContainer>
            )}
        </>
    )
}

export default UserEditScreen