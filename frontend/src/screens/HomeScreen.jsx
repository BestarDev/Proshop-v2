import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'

const HomeScreen = () => {
  const { data : products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      { isLoading ? (<h1>Loading...</h1>) 
      : error ? (<h1>Error</h1>)
      : (
        <>
          <h1>Latest Products</h1>
          <Row>
              {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                  </Col>
              ))}
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen