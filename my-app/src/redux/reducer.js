import { TOGGLE_THEME } from "./actionTypes"

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case TOGGLE_THEME:
            return { ...state, theme: state.theme === "light" ? "dark" : "light" }
        default:
            return state
    }
}
