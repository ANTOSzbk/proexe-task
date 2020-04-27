import { SHOW_ALERT } from '../actions/UserActions'

const initialState = {
  show: false,
  timeout: 3500,
  message: null,
  error: false
}

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        show: !state.show,
        message: action.message,
        timeout: action.timeout ? action.timeout : state.timeout,
        error: action.error,
      }
    default: return state
  }
}

export default alertReducer;
