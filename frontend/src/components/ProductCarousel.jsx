import React, { useEffect } from 'react'
import { useGetTopProductsQuery } from '../slices/productsApiSlice'
import Message from './Message';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCarousel = () => {
    const {data:products, isLoading, error } = useGetTopProductsQuery();
    useEffect(() => {
        console.log(products);
    }, [products])
    return (
        <>
            {isLoading ? <></> :
            error ? <Message variant='danger'>{error?.data?.message || error.error} </Message> : (
                <Carousel pause='hover' className='bg-primary mb-4'>
                    {products.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/products/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid />
                                <Carousel.Caption className='carousel-caption'>
                                    <h2>{product.name}(${product.price})</h2>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </>
    )
}

export default ProductCarousel