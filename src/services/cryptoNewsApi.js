import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    "x-bingapis-sdk": "true",
    "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
    "x-rapidapi-key": "251a9b1af5msh0b8734fc7f5fc07p1540c0jsn15e1d9034322",
}

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest=(url)=>({url, headers: cryptoNewsHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptoNews: builder.query({
            query:({newsCategory, count})=> createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const {useGetCryptoNewsQuery} = cryptoNewsApi;

// var options = {
//     method: "GET",
//     url: "https://bing-news-search1.p.rapidapi.com/news",
//     params: { safeSearch: "Off", textFormat: "Raw" },
//     headers: {
//         "x-bingapis-sdk": "true",
//         "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
//         "x-rapidapi-key": "251a9b1af5msh0b8734fc7f5fc07p1540c0jsn15e1d9034322",
//     },
// };