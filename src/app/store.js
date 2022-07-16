import {configureStore} from '@reduxjs/toolkit';
// connect api to the store
import { cryptoApi } from '../services/cryptoapi';
import { cryptoNewsApi} from '../services/cryptoNewsApi';

export default configureStore({
    reducer:{
        [cryptoApi.reducerPath]:cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]:cryptoNewsApi.reducer,
    },
});