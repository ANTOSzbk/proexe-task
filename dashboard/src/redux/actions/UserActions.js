import axios from 'axios';

// ------------ API CALLS ---------------
export const GET_USERS = 'GET_USERS';
export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const EDIT_USER = 'EDIT_USER'
export const GET_USER = 'GET_USER'

// --------- STATE MANAGEMENT -----------
export const SET_USERS = 'SET_USERS';
export const PUSH_USER = 'PUSH_USER';
export const RESET_RESPONSE = 'RESET_RESPONSE'
export const IS_EMPTY = 'IS_EMPTY'
export const SORT_BY_USERNAME = 'SORT_BY_USERNAME'



// ------------------------ STATE MANAGEMENT ---------------------------

export const setUsers = (users) => dispatch => {
  dispatch({
    type: SET_USERS,
    payload: users,
  })
}
export const pushUser = (user) => dispatch => {
  dispatch({
    type: PUSH_USER,
    payload: user,
  })
}
export const resetResponse = () => dispatch => {
  dispatch({
    type: RESET_RESPONSE,
  })
}

export const isEmpty = () => dispatch => {
  dispatch({
    type: IS_EMPTY,
  })
}

export const sortByUsername = () => dispatch => {
  dispatch({
    type: SORT_BY_USERNAME,
  })
}

// -------------------------- API CALLS --------------------------------

export const getUsers = () => dispatch => {
  axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  });
};

export const getUser = (id) => dispatch => {
  axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
    dispatch({
      type: GET_USER,
      payload: res.data
    })
  })
}

export const addUser = (name, email) => (dispatch) => {
  axios
    .post('https://jsonplaceholder.typicode.com/users', { name, email, address: '' })
    .then((res) => {
      dispatch({
        type: ADD_USER,
        payload: res.data,
        response: res.status
      });
    });
};

export const deleteUser = (id) => (dispatch) => {
  axios
    .delete(`https://jsonplaceholder.typicode.com/users/${id}`, { id })
    .then((res) => {
      dispatch({
        type: DELETE_USER,
        payload: res.data,
        response: res.status
      });
    });
};

export const editUser = (id, name, email) => (dispatch) => {
  axios
    .patch(`https://jsonplaceholder.typicode.com/users/${id}`, { name, email })
    .then((res) => {
      console.log(res)
      dispatch({
        type: EDIT_USER,
        payload: res.data,
        response: res.status
      });
    });
};
