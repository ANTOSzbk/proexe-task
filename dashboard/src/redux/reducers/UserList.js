import { GET_USERS, SET_USERS, PUSH_USER, IS_EMPTY, SORT_BY_USERNAME } from "../actions/UserActions"

const initialState = {
    items: [],
    success: false,
    sortedByUsername: undefined,
}

const userListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                items: action.payload,
                id_counter: action.payload.length
            }
        case SET_USERS:
            return {
                ...state,
                items: action.payload,
                success: action.success
            }
        case PUSH_USER:
            return {
                ...state,
                items: [...state.items, action.payload],
                success: action.success,
                id_counter: state.id_counter += 1
            }
        case SORT_BY_USERNAME:
            return {
                ...state,
                items: state.sortedByUsername ? state.items.sort((a, b) => (a.username > b.username) ? 1 : -1) : state.items.sort((b, a) => (a.username > b.username) ? 1 : -1),
                sortedByUsername: !state.sortedByUsername
            }
        case IS_EMPTY:
            return {
                ...state,
                isEmpty: state.items.length === 0
            }
        default: return state
    }
}

export default userListReducer;