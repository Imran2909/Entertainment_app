import { ADD_BOOKMARK, REMOVE_BOOKMARK, TOGGLE_THEME } from "./actionTypes"

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case TOGGLE_THEME:
            return { ...state, theme: state.theme === "light" ? "dark" : "light" }
        case ADD_BOOKMARK:
            return { ...state, bookmark: [...state.bookmark, payload] }
        case REMOVE_BOOKMARK:
            return {
                ...state, bookmark: state.bookmark.filter((el) => {
                    return el !== payload
                })
            }

        default:
            return state
    }
}
