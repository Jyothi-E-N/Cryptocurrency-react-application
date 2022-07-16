import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    "x-rapidapi-key": "251a9b1af5msh0b8734fc7f5fc07p1540c0jsn15e1d9034322",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });
// returns an object that contains both url and headers

export const cryptoApi = createApi({
    reducerPath: "cryptoApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        // names of endpoints
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) =>
                createRequest(
                    `/coin/${coinId}/history?timePeriod=${timePeriod}`
                ),
        }),
        getCryptoExchanges: builder.query({
            query: (count) => createRequest(`/exchanges?limit=${count}`),
        }),
        getReferenceCurrencies: builder.query({
            query: (type) =>
                createRequest(`/reference-currencies?types[]=${type}`),
        }),
    }),
});

export const { useGetCryptoDetailsQuery } = cryptoApi;
export const { useGetCryptoHistoryQuery } = cryptoApi;
export const { useGetCryptoExchangesQuery } = cryptoApi;
export const { useGetCryptosQuery } = cryptoApi;
export const { useGetReferenceCurrenciesQuery } = cryptoApi;
