import { ADD_BOOKMARK, ADD_MOVIES_BOOKMARK, ADD_TV_SERIES_BOOKMARK, DATA_FETCH_FAILED, FETCH_BOOKMARK_MOVIES_SUCCESS, FETCH_BOOKMARK_TV_SERIES_SUCCESS, GET_BOOKMARK, GET_MOVIES_BOOKMARK, GET_TV_SERIES_BOOKMARK, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, MOVIE_DATA_FETCH_COMPLETED, OAUTH_LOGIN_SUCCESS, RECOMMENDED_DATA_FETCH_COMPLETED, REMOVE_BOOKMARK, REMOVE_MOVIES_BOOKMARK, REMOVE_TV_SERIES_BOOKMARK, REQUEST_ACTION, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS, SINGLE_MOVIE_DATA_FETCH_COMPLETED, SINGLE_SERIES_DATA_FETCH_COMPLETED, TOGGLE_THEME, TRENDING_DATA_FETCH_COMPLETED, TVSERIES_DATA_FETCH_COMPLETED } from "./actionTypes"

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case TOGGLE_THEME:
            return { ...state, theme: state.theme === "light" ? "dark" : "light" }
        case ADD_MOVIES_BOOKMARK:
            return { ...state, moviesBookmark: [...state.moviesBookmark, payload] }

        case REMOVE_MOVIES_BOOKMARK:
            return {
                ...state,
                moviesBookmark: state.moviesBookmark.filter((movieId) => movieId !== payload),
                moviesBookmarkData: state.moviesBookmarkData.filter((movie) => movie.id !== payload)
            };

        case REMOVE_TV_SERIES_BOOKMARK:
            return {
                ...state,
                tvSeriesBookmark: state.tvSeriesBookmark.filter((seriesId) => seriesId !== payload),
                tvSeriesBookmarkData: state.tvSeriesBookmarkData.filter((series) => series.id !== payload)
            };


        case ADD_TV_SERIES_BOOKMARK:
            return { ...state, tvSeriesBookmark: [...state.tvSeriesBookmark, payload] }
        case GET_MOVIES_BOOKMARK:
            return { ...state, moviesBookmark: payload }
        case GET_TV_SERIES_BOOKMARK:
            return { ...state, tvSeriesBookmark: payload }
        case FETCH_BOOKMARK_MOVIES_SUCCESS:
            return { ...state, isLoading: false, isError: false, moviesBookmarkData: payload }
        case FETCH_BOOKMARK_TV_SERIES_SUCCESS:
            return { ...state, isLoading: false, isError: false, tvSeriesBookmarkData: payload }
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
        case LOGIN_REQUEST:
            return { ...state, isLoading: true }
        case LOGIN_FAILURE:
            return { ...state, isLoading: false, isError: true }
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, isAuth: true, token: payload, isError: false }
        case SIGNUP_REQUEST:
            return { ...state, isLoading: true }
        case SIGNUP_FAILURE:
            return { ...state, isLoading: false, isError: true }
        case SIGNUP_SUCCESS:
            return { ...state, isLoading: false, isError: false }
        case OAUTH_LOGIN_SUCCESS:
            return { ...state, isLoading: false, isAuth: true, token: payload, isError: false  }
        case LOGOUT:
            return { ...state, isAuth: false, moviesBookmark:[], tvSeriesBookmark:[], moviesBookmarkData:[], tvSeriesBookmarkData:[]  }
        default:
            return state
    }
}

