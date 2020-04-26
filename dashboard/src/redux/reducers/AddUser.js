import { ADD_USER, RESET_RESPONSE } from "../actions/UserActions"



const addUserReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                addUser: action.payload,
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

export default addUserReducer;
