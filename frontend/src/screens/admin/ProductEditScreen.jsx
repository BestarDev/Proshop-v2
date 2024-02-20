import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetProductByIdQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../slices/productsApiSlice'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { toast } from 'react-toastify'

const ProductEditScreen = () => {
    const [name, setName] = useState('')
    const [price, setPrice ] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [category, setCategory] = useState('')

    const {id: productId} = useParams();
    const navigate = useNavigate();

    const {data: product, isLoading, error} = useGetProductByIdQuery(productId);
    const [updateProduct, { isLoading: loadingUpdate}] = useUpdateProductMutation();
    const [uploadProductImage, { isLoading: loadingUpload}] = useUploadProductImageMutation();

    useEffect(() => {
        if(product) {
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setBrand(product.brand)
            setCountInStock(product.countInStock)
            setCategory(product.category)
            setImage(product.image)
        }
    }, [product])

    const submitHandler = async(e) => {
        e.preventDefault();
        const updatedProduct = {
            productId, name, description, price, brand, countInStock, category, image
        }
        const result = await updateProduct({productId, data: {...updatedProduct}});
        if(result.error) {
            toast.error(result.error)
        } else {
            toast.success('Product Updated Successfully')
            navigate('/admin/productlist')
        }
    }

    const uploadFileHandler = async(e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        console.log(formData.keys());
        try{
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message)
            setImage(res.image);
        } catch(err) {
            toast.error(err?.data?.message || err.error); 
        }
    }

    return (
        <>
            <Link to={`/admin/productlist`} className='btn btn-light my-3'>
                Go Back
            </Link>
            {loadingUpdate && loadingUpload && isLoading ? <Loader /> : 
            error ? <Message variant='danger'>{error?.data?.message || error.error }</Message> : (
                <FormContainer>
                    <h1>Edit Product</h1>
                    <Form onSubmit={submitHandler} >
                        <FormGroup controlId='name' className='my-1'>
                            <FormLabel>Name</FormLabel>
                            <FormControl type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                        </FormGroup>
                        <FormGroup controlId='price' className='my-1'>
                            <FormLabel>Price</FormLabel>
                            <FormControl type='number' value={price} onChange={(e) => setPrice(e.target.value)}/>
                        </FormGroup>
                        <FormGroup controlId='image' className='my-1'>
                            <FormLabel>Image</FormLabel>
                            <FormControl type='text' placeholder='Enter image url' value={image}
                                onChange={(e) => setImage(e.target.value)} />
                            <FormControl type='file' label='Choose file' onChange={uploadFileHandler} />
                        </FormGroup>
                        <FormGroup controlId='brand' className='my-1'>
                            <FormLabel>Brand</FormLabel>
                            <FormControl type='text' value={brand} onChange={(e) => setBrand(e.target.value)}/>
                        </FormGroup>
                        <FormGroup controlId='countInStock' className='my-1'>
                            <FormLabel>Count In Stock</FormLabel>
                            <FormControl type='number' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}/>
                        </FormGroup>
                        <FormGroup controlId='category' className='my-1'>
                            <FormLabel>Category</FormLabel>
                            <FormControl type='text' value={category} onChange={(e) => setCategory(e.target.value)}/>
                        </FormGroup>
                        <FormGroup controlId='description' className='my-1'>
                            <FormLabel>Description</FormLabel>
                            <FormControl type='text' value={description} onChange={(e) => setDescription(e.target.value)}/>
                        </FormGroup>
                        <Button type='submit' className='my-2' variant='primary'>Update</Button>
                    </Form>
                </FormContainer>
            )}
        </>
    )
}

export default ProductEditScreen