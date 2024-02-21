import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import { Link, useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = () => {
  // I think useParams can be used for destructuring in safe way.
  const {pageNumber, keyword} = useParams();
  const { data, isLoading, error } = useGetProductsQuery({pageNumber, keyword});

  return (
    <>
    {!keyword ? <ProductCarousel />: <Link to='/' className='btn btn-light'>Go Back</Link>}
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
          <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''}/>
        </>
      )}
    </>
  )
}

export default HomeScreen