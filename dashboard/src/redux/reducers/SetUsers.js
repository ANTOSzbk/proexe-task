import { SET_USERS } from "../actions/UserActions"

const initialState = {
    items: []
}

const setUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                items: action.payload
            }
        default: return state;
    }
}

export default setUsersReducer;