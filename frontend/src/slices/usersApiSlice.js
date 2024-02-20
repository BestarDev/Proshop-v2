import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: USERS_URL,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method:'PUT',
                body: data,
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL
            }),
            keepUnusedDataFor: 5,
            providesTags: ["User"]
        }),
        getUserById: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`
            }),
            keepUnusedDataFor: 5,
            providesTags: ['User']
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
            })
        }),
        updateUser: builder.mutation({
            query: ({userId, userData}) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'PUT',
                body: userData
            }),
            invalidatesTags: ['User']
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useProfileMutation,
        useGetUsersQuery, useGetUserByIdQuery, useDeleteUserMutation, useUpdateUserMutation } = usersApiSlice;