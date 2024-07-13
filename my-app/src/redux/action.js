import { ADD_BOOKMARK, FETCH_MOVIES_SUCCESS, REMOVE_BOOKMARK, TOGGLE_THEME } from "./actionTypes"
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