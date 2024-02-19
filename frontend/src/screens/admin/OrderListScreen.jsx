import React, { useEffect } from 'react'
import { useGetOrdersQuery } from '../../slices/ordersApiSlice'
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Button, Table } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

const OrderListScreen = () => {
  const {data: orders, isLoading, error} = useGetOrdersQuery();
  useEffect(() => {
    console.log(orders);
  }, [orders])
  return (
    <>
      <h1>Orders List</h1>
      { isLoading ? <Loader /> :
      error ? <Message variant='danger'>{error?.data?.message || error.error }</Message> : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
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
              <td>{order.user.name}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>${order.totalPrice}</td>
              <td>
                {order.isPaid ? order.paidAt.substring(0, 10) : <FaTimes style={{ color: 'red'}}/>}
              </td>
              <td>
                {order.isDelivered ? order.deliveredAt.substring(0, 10) : <FaTimes style={{color: 'red'}} />}
              </td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button type='button' className='btn-sm' variant='light'>Details</Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen