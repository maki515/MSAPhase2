import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3' }),
  endpoints: (builder) => ({
    getCryptoPrice: builder.query({
      query: (currency) => `simple/price?ids=${currency}&vs_currencies=usd`,
    }),
  }),
})

export const { useGetCryptoPriceQuery } = cryptoApi
