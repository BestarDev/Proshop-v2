import { PRODUCTS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ( {
                url: PRODUCTS_URL
            }),
            keepUnusedDataFor: 5,
        }),
        getProductById: builder.query({
            query: (productId) => ( {
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5,
        })
    })
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiSlice;