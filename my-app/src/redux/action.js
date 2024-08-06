import { useSelector } from "react-redux"
import { ADD_MOVIES_BOOKMARK, ADD_TV_SERIES_BOOKMARK, DATA_FETCH_FAILED, FETCH_BOOKMARK_MOVIES_SUCCESS, FETCH_BOOKMARK_TV_SERIES_SUCCESS, FETCH_MOVIES_SUCCESS, GET_MOVIES_BOOKMARK, GET_TV_SERIES_BOOKMARK, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, MOVIE_DATA_FETCH_COMPLETED, OAUTH_LOGIN_SUCCESS, RECOMMENDED_DATA_FETCH_COMPLETED, REMOVE_MOVIES_BOOKMARK, REMOVE_TV_SERIES_BOOKMARK, REQUEST_ACTION, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS, SINGLE_MOVIE_DATA_FETCH_COMPLETED, SINGLE_SERIES_DATA_FETCH_COMPLETED, TOGGLE_THEME, TRENDING_DATA_FETCH_COMPLETED, TVSERIES_DATA_FETCH_COMPLETED } from "./actionTypes"
import axios from 'axios'


export const toggleThemeAction = () => {
    return { type: TOGGLE_THEME }
}


export const requestFetchBookmarkMovies = () => async (dispatch) => {
    try {
        const ids = await axios.get("https://entertainment-backend-1.onrender.com/getMovieBookmark");
        dispatch({
            type: GET_MOVIES_BOOKMARK,
            payload: ids.data
        });
        const promises = ids.data.map((id) =>
            axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=5ae304b91cd12d71e100db44c6812cb6`)
        );
        const responses = await Promise.all(promises);
        const movies = responses.map((response) => response.data);
        //console.log(movies, "from req.fet.mov.book")
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
        const ids = await axios.get("https://entertainment-backend-1.onrender.com/getTvSeriesBookmark");
        dispatch({
            type: GET_TV_SERIES_BOOKMARK,
            payload: ids.data
        });
        const promises = ids.data.map((id) =>
            axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=5ae304b91cd12d71e100db44c6812cb6`)
        );
        const responses = await Promise.all(promises);
        const movies = responses.map((response) => response.data);
        //console.log(movies, "from req.fet.mov.book")
        dispatch({
            type: FETCH_BOOKMARK_TV_SERIES_SUCCESS,
            payload: movies
        })
    } catch (error) {
        console.log(error)
    }
}


export const addMovieBookmark = (payload) => async (dispatch) => {
    try {
        const response = await axios.put("https://entertainment-backend-1.onrender.com/addMovieBookmark", payload);
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
        const response = await axios.put("https://entertainment-backend-1.onrender.com/removeMovieBookmark", payload);
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
        const response = await axios.put("https://entertainment-backend-1.onrender.com/addTvSeriesBookmark", payload);
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
        const response = await axios.put("https://entertainment-backend-1.onrender.com/removeTvSeriesBookmark", payload);
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
        const response = await axios.get("https://entertainment-backend-1.onrender.com/getMovieBookmark");
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
        const response = await axios.get("https://entertainment-backend-1.onrender.com/getTvSeriesBookmark");
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


export const login = (userData) => (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    return axios.post("https://entertainment-backend-1.onrender.com/user/login", userData)
        .then((res) => {
            //console.log("Response status:", res.status);
            if (res.status === 200) {
                //console.log("login success");
                dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
                localStorage.setItem('token', res.data.token);
                return true;
            } else {
                //console.log("Unexpected response status:", res.status);
                dispatch({ type: LOGIN_FAILURE, payload: res.data.msg });
                return false;
            }
        })
        .catch((err) => {
            const errorMessage = err.response ? err.response.data.msg : err.message;
            //console.log("login fail with error:", errorMessage);
            dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
            return false;
        });
};


export const oauthLogin = () => (dispatch) => {
    try {
        dispatch({ type: OAUTH_LOGIN_SUCCESS, payload: "res.data.token" })
        //console.log('oauth success from action');
        localStorage.setItem('token', Math.random()*10000);
    } catch (error) {
        //console.log('oauth fail from action');
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
}


export const signup = (userData) => (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });
    return axios.post("https://entertainment-backend-1.onrender.com/user/signup", userData)
        .then((res) => {
            if (res.status === 200) {
                //console.log("login success");
                dispatch({ type: SIGNUP_SUCCESS });
                return true;
            } else {
                //console.log("Unexpected response status:", res.status);
                dispatch({ type: SIGNUP_FAILURE, payload: res.data.msg });
                return false;
            }
        })
}


export const logout = () => {
    localStorage.removeItem('token');
    return { type: LOGOUT }
}


