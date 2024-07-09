import { ADD_BOOKMARK, REMOVE_BOOKMARK, TOGGLE_THEME } from "./actionTypes"

export const toggleThemeAction = () => {
    return { type: TOGGLE_THEME }
}

export const addBookmark = (payload) => {
    return { type: ADD_BOOKMARK, payload }
}

export const removeBookmark = (payload) => {
    return { type: REMOVE_BOOKMARK, payload }
}
