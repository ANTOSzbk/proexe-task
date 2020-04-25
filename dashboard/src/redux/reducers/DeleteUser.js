import { DELETE_USER, RESET_RESPONSE } from "../actions/UserActions"

const initialState = {
    response: 0,
}

const deleteUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_USER:
            return {
                ...state,
                deleteUser: action.payload,
                response: action.response
            }
        case RESET_RESPONSE: {
            return {
                ...state,
                response: undefined,
            }
        }
        default: return state
    }
}

export default deleteUserReducer;