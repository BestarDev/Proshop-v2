import React from 'react'
import { useDeleteUserMutation, useGetUsersQuery } from '../../slices/usersApiSlice'
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Button, Table } from 'react-bootstrap';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';

const UserListScreen = () => {
    const {data: users, refetch, isLoading, error} = useGetUsersQuery();
    const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();

    const deleteHandler = async(id) => {
        if(window.confirm('Are you sure you want to delete a user?')){
            try {
                const res = await deleteUser(id);
                refetch();
                if(res.error) {
                    toast.error(res.error.data.message);
                }
            } catch (err) {
                console.log(err);
                toast.error(err?.data?.message || err.Error || err.toString());
            }
        }
    }
    return (
        <>
        {loadingDelete && <Loader />}
        { isLoading ? <Loader /> : 
        error ? <Message variant='danger'>{error?.data?.message || error.error }</Message> : (
            <Table striped hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>IS ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>
                            {
                                user.isAdmin ? 
                                <FaCheck style={{color: 'green'}} /> : 
                                <FaTimes style={{color: 'red'}} />
                            }
                            </td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <FaEdit />
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm'
                                    onClick={() => deleteHandler(user._id)}
                                >
                                    <FaTrash style={{color: 'white'}}/>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
        </>
    )
}

export default UserListScreen