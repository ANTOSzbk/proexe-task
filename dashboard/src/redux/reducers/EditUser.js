import { EDIT_USER, RESET_RESPONSE } from "../actions/UserActions"

const editUserReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_USER:
      return {
        ...state,
        editUser: action.payload,
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

export default editUserReducer;