import { GET_USER } from "../actions/UserActions"

const initialState = {
    item: {
        address: '',
    }
}
// placeholder for nested properties

const getUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                item: action.payload
            }
        default: return state;
    }
}

export default getUserReducer;