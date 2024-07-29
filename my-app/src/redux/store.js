import { legacy_createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { reducer } from './reducer';

const initialState = {
    theme: "light",
    avatar: "https://img1.pnghut.com/t/22/13/22/7vKZnT8gWz/symbol-black-and-white-user-profile-information-monochrome.jpg",
    bookmark: [],
    moviesBookmark: [],
    tvSeriesBookmark: [],
    moviesBookmarkData: [],
    tvSeriesBookmarkData: [],
    isLoading: false,
    isError: false,
    trendingData: [],
    recommendedData: [],
    movies:[],
    tvSeries:[],
    singleSeries:[],
    singleMovie:[],
    isAuth: !!localStorage.getItem('token'), // Check if token exists in localStorage
    token: localStorage.getItem('token') || "" // Retrieve token from localStorage
};

const middleware = [thunk];

export const store = legacy_createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
);
