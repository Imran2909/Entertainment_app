import { ADD_BOOKMARK, DATA_FETCH_FAILED, FETCH_MOVIES_SUCCESS, MOVIE_DATA_FETCH_COMPLETED, RECOMMENDED_DATA_FETCH_COMPLETED, REMOVE_BOOKMARK, REQUEST_ACTION, TOGGLE_THEME, TRENDING_DATA_FETCH_COMPLETED, TVSERIES_DATA_FETCH_COMPLETED } from "./actionTypes"
import axios from 'axios'

export const toggleThemeAction = () => {
    return { type: TOGGLE_THEME }
}

export const addBookmark = (payload) => {
    return { type: ADD_BOOKMARK, payload }
}

export const removeBookmark = (payload) => {
    return { type: REMOVE_BOOKMARK, payload }
}

export const fetchMovies = () => async (dispatch) => {
    try {
        const response = await axios.get('YOUR_MOVIES_API_ENDPOINT');
        dispatch({ type: FETCH_MOVIES_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Failed to fetch movies', error);
    }
}

export const requestAction = () => {
    return { type: REQUEST_ACTION }
}

export const requestTrendingDataFetch = (payload) => async (dispatch) => {
    try {
        const response = await axios.get(payload)
        return dispatch({ type: TRENDING_DATA_FETCH_COMPLETED, payload: response.data.results })
    } catch (error) {
        dispatch({ type: DATA_FETCH_FAILED })
    }
}

export const requestRecommendedDateFetch = (payload) => async (dispatch) => {
    try {
        const { movieUrl, tvUrl } = payload
        const movieResponse = await axios.get(movieUrl)
        const tvResponse = await axios.get(tvUrl)
        const coll = [...movieResponse.data.results, ...tvResponse.data.results]
        return dispatch({ type: RECOMMENDED_DATA_FETCH_COMPLETED, payload: coll })
    } catch (error) {
        dispatch({ type: DATA_FETCH_FAILED })
    }
}

export const requestMovieDataFetch = (payload) => async (dispatch) => {
    try {
        const response = await axios.get(payload)
        return dispatch({ type: MOVIE_DATA_FETCH_COMPLETED, payload: response.data.results })
    } catch (error) {
        dispatch({ type: DATA_FETCH_FAILED })
    }
}

export const requestTvSeriesDataFetch = (payload) => async (dispatch) => {
    try {
        const response = await axios.get(payload)
        return dispatch({ type: TVSERIES_DATA_FETCH_COMPLETED, payload: response.data.results })
    } catch (error) {
        dispatch({ type: DATA_FETCH_FAILED })
    }
}

