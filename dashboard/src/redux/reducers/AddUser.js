import { ADD_USER, RESET_RESPONSE } from "../actions/UserActions"



const initialState = {
  addUser: {
    id: null,
    name: null,
    username: null,
    address: {
      city: null
    },
    email: null
  }
}

const addUserReducer = (state = initialState, action) => {
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
