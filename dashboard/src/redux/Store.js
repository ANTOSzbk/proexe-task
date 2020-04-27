import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk"
import addUserReducer from './reducers/AddUser';
import deleteUserReducer from './reducers/DeleteUser';
import userListReducer from './reducers/UserList';
import editUserReducer from './reducers/EditUser';
import getUserReducer from './reducers/GetUser';
import alertReducer from './reducers/Alert';

const middleware = [thunk]

const rootReducer = combineReducers({
  addUser: addUserReducer,
  deleteUser: deleteUserReducer,
  editUser: editUserReducer,
  getUsers: userListReducer,
  getUser: getUserReducer,
  alert: alertReducer,
});

const Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
