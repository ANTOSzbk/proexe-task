import React, { useState, useEffect } from 'react';
import Form from '../../components/Form/Form';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  addUser,
  pushUser,
  resetResponse,
  isEmpty,
} from '../../redux/actions/UserActions';

function AddForm(props) {
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = { ...props.addedUser };
    // uniqueID for every new user based on received users, if table is empty start from 1 --- should use UUID lib
    // we send request to retrieve all users only once when visiting main page to improve user experience, heading from ./* route results in empty users Array
    !props.lastItemId
      ? (user.id = Math.ceil(Math.random() * 100))
      : (user.id = props.lastItemId + 1);
    if (props.addResponseStatus === 201) props.pushUser(user);
    props.isEmpty();
    if (redirect) history.push('/');
    props.resetResponse();
    setLoading(false);
    setRedirect(true);
    // eslint-disable-next-line
  }, [props.addResponseStatus]);

  const onSubmit = (values) => {
    setLoading(true);
    props.addUser(values.name, values.email);
  };
  return (
    <>
      <h1 className="mb-3 border-bottom">Add new user</h1>
      <Form submitFunction={onSubmit} cancelRedirect={'/'} loading={loading} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    addedUser: state.addUser.addUser,
    addResponseStatus: state.addUser.response,
    lastItemId: state.getUsers.id_counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (name, email) => dispatch(addUser(name, email)),
    pushUser: (user) => dispatch(pushUser(user)),
    resetResponse: () => dispatch(resetResponse()),
    isEmpty: () => dispatch(isEmpty()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
