import { GET_USER, RESET_RESPONSE } from "../actions/UserActions"

const initialState = {
  item: {
    address: '',
  },
  response: undefined
}

const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        item: action.payload,
        response: action.response
      }
    case RESET_RESPONSE:
      return {
        ...state,
        item: {
          address: ''
        },
        response: undefined
      }
    default: return state;
  }
}

export default getUserReducer;