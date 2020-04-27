import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Store from './redux/Store';
import { Provider } from 'react-redux';
import EditForm from './containers/Forms/EditForm';
import AddForm from './containers/Forms/AddForm';
import Dashboard from './containers/Dashboard/Dashboard';

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Dashboard} exact />
            <Route path="/edit/:id" component={EditForm} exact />
            <Route path="/add" component={AddForm} exact />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}


export default App;
