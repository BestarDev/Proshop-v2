import { PRODUCTS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ( {
                url: PRODUCTS_URL
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5,
        }),
        getProductById: builder.query({
            query: (productId) => ( {
                url: `${PRODUCTS_URL}/${productId}`
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: ({productId, data}) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Product']
        })
    })
})

export const { useGetProductsQuery, useGetProductByIdQuery, useCreateProductMutation, useUpdateProductMutation } = productsApiSlice;