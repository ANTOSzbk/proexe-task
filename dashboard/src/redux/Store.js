import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk"
import addUserReducer from './reducers/AddUser';
import deleteUserReducer from './reducers/DeleteUser';
import userListReducer from './reducers/UserList';
import editUserReducer from './reducers/EditUser';
import getUserReducer from './reducers/GetUser';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk]

const rootReducer = combineReducers({
  addUser: addUserReducer,
  deleteUser: deleteUserReducer,
  editUser: editUserReducer,
  getUsers: userListReducer,
  getUser: getUserReducer
});

const Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
