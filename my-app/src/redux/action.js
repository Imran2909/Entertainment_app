import { useSelector } from "react-redux"
import { ADD_MOVIES_BOOKMARK, ADD_TV_SERIES_BOOKMARK, DATA_FETCH_FAILED, FETCH_BOOKMARK_MOVIES_SUCCESS, FETCH_BOOKMARK_TV_SERIES_SUCCESS, FETCH_MOVIES_SUCCESS, GET_BOOKMARK, GET_MOVIES_BOOKMARK, GET_TV_SERIES_BOOKMARK, MOVIE_DATA_FETCH_COMPLETED, RECOMMENDED_DATA_FETCH_COMPLETED, REMOVE_BOOKMARK, REMOVE_MOVIES_BOOKMARK, REMOVE_TV_SERIES_BOOKMARK, REQUEST_ACTION, SINGLE_MOVIE_DATA_FETCH_COMPLETED, SINGLE_SERIES_DATA_FETCH_COMPLETED, TOGGLE_THEME, TRENDING_DATA_FETCH_COMPLETED, TVSERIES_DATA_FETCH_COMPLETED } from "./actionTypes"
import axios from 'axios'

export const toggleThemeAction = () => {
    return { type: TOGGLE_THEME }
}



export const requestFetchBookmarkMovies = () => async (dispatch) => {
    try {
        const ids = await axios.get("http://localhost:8050/getMovieBookmark");
        dispatch({
            type: GET_MOVIES_BOOKMARK,
            payload: ids.data
        });
        const promises = ids.data.map((id) =>
            axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=5ae304b91cd12d71e100db44c6812cb6`)
        );
        const responses = await Promise.all(promises);
        const movies = responses.map((response) => response.data);
        console.log(movies, "from req.fet.mov.book")
        dispatch({
            type: FETCH_BOOKMARK_MOVIES_SUCCESS,
            payload: movies
        })
    } catch (error) {
        console.log(error)
    }
}


export const requestFetchBookmarkTvSeries = () => async (dispatch) => {
    try {
        const ids = await axios.get("http://localhost:8050/getTvSeriesBookmark");
        dispatch({
            type: GET_TV_SERIES_BOOKMARK,
            payload: ids.data
        });
        const promises = ids.data.map((id) =>
            axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=5ae304b91cd12d71e100db44c6812cb6`)
        );
        const responses = await Promise.all(promises);
        const movies = responses.map((response) => response.data);
        console.log(movies, "from req.fet.mov.book")
        dispatch({
            type: FETCH_BOOKMARK_TV_SERIES_SUCCESS ,
            payload: movies
        })
    } catch (error) {
        console.log(error)
    }
}


export const addMovieBookmark = (payload) => async (dispatch) => {
    try {
        const response = await axios.put("http://localhost:8050/addMovieBookmark", payload);
        if (response.status === 200) {
            dispatch({
                type: ADD_MOVIES_BOOKMARK,
                payload: payload.movieId
            });
        }
    } catch (error) {
        console.error(error.message)
    }
}


export const removeMovieBookmark = (payload) => async (dispatch) => {
    try {
        const response = await axios.put("http://localhost:8050/removeMovieBookmark", payload);
        if (response.status === 200) {
            dispatch({
                type: REMOVE_MOVIES_BOOKMARK,
                payload: payload.movieId
            });
        }
    } catch (error) {
        console.error(error.message)
    }
}


export const addTvSeriesBookmark = (payload) => async (dispatch) => {
    try {
        const response = await axios.put("http://localhost:8050/addTvSeriesBookmark", payload);
        if (response.status === 200) {
            dispatch({
                type: ADD_TV_SERIES_BOOKMARK,
                payload: payload.movieId
            });
        }
    } catch (error) {
        console.error(error.message)
    }
}


export const removeTvSeriesBookmark = (payload) => async (dispatch) => {
    try {
        const response = await axios.put("http://localhost:8050/removeTvSeriesBookmark", payload);
        if (response.status === 200) {
            dispatch({
                type: REMOVE_TV_SERIES_BOOKMARK,
                payload: payload.movieId
            });
        }
    } catch (error) {
        console.error(error.message)
    }
}


export const getMoviesBookmark = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:8050/getMovieBookmark");
        return dispatch({
            type: GET_MOVIES_BOOKMARK,
            payload: response.data
        });
    } catch (error) {
        console.error('Failed to fetch movies', error);
    }
}


export const getTvSeriesBookmark = () => async (dispatch) => {
    try {
        const response = await axios.get("http://localhost:8050/getTvSeriesBookmark");
        return dispatch({
            type: GET_TV_SERIES_BOOKMARK,
            payload: response.data
        });
    } catch (error) {
        console.error('Failed to fetch movies', error);
    }
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

export const requestSingleMovieDataFetch = (payload) => async (dispatch) => {
    try {
        const response = await axios.get(payload)
        return dispatch({ type: SINGLE_MOVIE_DATA_FETCH_COMPLETED, payload: response.data })
    } catch (error) {
        dispatch({ type: DATA_FETCH_FAILED })
    }
}

export const requestSingleSeriesDataFetch = (payload) => async (dispatch) => {
    try {
        const response = await axios.get(payload)
        return dispatch({ type: SINGLE_SERIES_DATA_FETCH_COMPLETED, payload: response.data })
    } catch (error) {
        dispatch({ type: DATA_FETCH_FAILED })
    }
}


