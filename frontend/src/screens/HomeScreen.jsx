import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'

const HomeScreen = () => {
  // I think useParams can be used for destructuring in safe way.
  const {pageNumber} = useParams();
  const { data, isLoading, error } = useGetProductsQuery({pageNumber});

  return (
    <>
      { isLoading ? (<Loader />) 
      : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>)
      : (
        <>
          <h1>Latest Products</h1>
          <Row>
              {data.products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                  </Col>
              ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} />
        </>
      )}
    </>
  )
}

export default HomeScreen