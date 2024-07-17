import { ADD_BOOKMARK, DATA_FETCH_FAILED, MOVIE_DATA_FETCH_COMPLETED, RECOMMENDED_DATA_FETCH_COMPLETED, REMOVE_BOOKMARK, REQUEST_ACTION, REQUEST_SINGLE_MOVIE_DATA_FETCH, SINGLE_MOVIE_DATA_FETCH_COMPLETED, SINGLE_SERIES_DATA_FETCH_COMPLETED, TOGGLE_THEME, TRENDING_DATA_FETCH_COMPLETED, TVSERIES_DATA_FETCH_COMPLETED } from "./actionTypes"

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case TOGGLE_THEME:
            return { ...state, theme: state.theme === "light" ? "dark" : "light" }
        case ADD_BOOKMARK:
            return { ...state, bookmark: [...state.bookmark, payload] }
        case REMOVE_BOOKMARK:
            return { ...state, bookmark: state.bookmark.filter((el) => { return el !== payload }) }
        case REQUEST_ACTION:
            return { ...state, isLoading: true, isError: false }
        case TRENDING_DATA_FETCH_COMPLETED:
            return { ...state, isLoading: false, isError: false, trendingData: [...payload] }
        case DATA_FETCH_FAILED:
            return { ...state, isLoading: false, isError: true }
        case RECOMMENDED_DATA_FETCH_COMPLETED:
            return { ...state, isLoading: false, isError: false, recommendedData: [...payload] }
        case MOVIE_DATA_FETCH_COMPLETED:
            return { ...state, isLoading: false, isError: false, movies: [...payload] }
        case TVSERIES_DATA_FETCH_COMPLETED:
            return { ...state, isLoading: false, isError: false, tvSeries: [...payload] }
        case SINGLE_SERIES_DATA_FETCH_COMPLETED:
            return { ...state, isLoading: false, isError: false, singleSeries: payload }
        case SINGLE_MOVIE_DATA_FETCH_COMPLETED:
            return { ...state, isLoading: false, isError: false, singleMovie: payload }

        default:
            return state
    }
}