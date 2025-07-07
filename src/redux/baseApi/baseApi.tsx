import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://level-2-assignment-4-backend-nine.vercel.app/api" }),
    tagTypes: ["book"],
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: ( { page = 1, limit = 10 } ) => `/books?page=${page}&limit=${limit}`,
            providesTags: ["book"],
        }),
        getSingleBook: builder.query({
            query: (id) => `/books/${id}`,
            providesTags: ["book"],
        }),
        updateBook: builder.mutation({
            query: ({ id, body }) => ({
                url: `/books/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["book"],
        }),
        createBook: builder.mutation({
            query: (body) => ({
                url: "/books",
                method: "POST",
                body,
            }),
            invalidatesTags: ["book"],
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["book"],
        }),
        borrowSummary: builder.query({
            query: () => `/borrow-summary`,
            providesTags: ["book"],
        }),
        borrow: builder.mutation({
            query: ({ id, body}) => ({
                url: `/borrow/${id}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["book"],
        })
    }),
})

export const { useGetAllBooksQuery, useGetSingleBookQuery, useUpdateBookMutation, useCreateBookMutation, useDeleteBookMutation, useBorrowSummaryQuery, useBorrowMutation } = baseApi;