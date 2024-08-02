import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import BaseResponse from "@/types/response";
import { Product } from "@prisma/client";

interface ProductResponse extends BaseResponse {
  data: {
    data: Product[];
    total: number;
  };
}

interface ProductApiItems {
  page?: String | undefined;
  category?: String | undefined;
  min_price?: String | undefined;
  max_price?: String | undefined;
  rating?: String | undefined;
}

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/product",
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductResponse, ProductApiItems>({
      query: ({ page, category, min_price, max_price, rating }) => ({
        url: "/",
        params: {
          page: page || undefined,
          category: category || undefined,
          min_price: min_price || undefined,
          max_price: max_price || undefined,
          rating: rating || undefined,
        },
      }),
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
