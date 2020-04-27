import React, { useEffect, useState } from 'react';
import User from '../../components/User/User';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { connect } from 'react-redux';
import {
  editUser,
  setUsers,
  getUsers,
  resetResponse,
  showAlert,
} from '../../redux/actions/UserActions';

function EditForm(props) {
  const { id } = useParams();
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const users = [...props.users];
    if (props.editResponseStatus === 200) {
      props.showAlert('User edited sucessfully.');
      for (let i in users)
        if (users[i].id.toString() === id) {
          users[i].name = props.editedUser.name;
          users[i].email = props.editedUser.email;
          props.setUsers(users);
        }
      props.resetResponse();
      setLoading(false);
      setRedirect(true);
    } else if (props.editResponseStatus)
      props.showAlert(
        'An error occured. User has not been edited.',
        false,
        true
      );
    if (redirect) history.push('/');
    //eslint-disable-next-line
  }, [props.editResponseStatus]);

  const onSubmit = (values) => {
    setLoading(true);
    props.editUser(id, values.name, values.email);
  };
  const currentUser = props.users.find((user) => user.id.toString() === id);
  return (
    <>
      <div>
        <h1 className="mb-3 border-bottom">Edit user</h1>
        <h4 className="mb-2">Original record (API)</h4>
        <User id={id} />
        <h4 className="mb-2">Current record</h4>
        <User id={id} current={props.users.length ? true : false} />
      </div>
      <Form
        submitFunction={onSubmit}
        cancelRedirect={'/'}
        loading={loading}
        name={currentUser ? currentUser.name : false}
        email={currentUser ? currentUser.email : false}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.getUsers.items,
    editedUser: state.editUser.editUser,
    editResponseStatus: state.editUser.response,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (id, name, email) => dispatch(editUser(id, name, email)),
    setUsers: (users) => dispatch(setUsers(users)),
    getUsers: () => dispatch(getUsers()),
    resetResponse: () => dispatch(resetResponse()),
    showAlert: (message, timeout, error) =>
      dispatch(showAlert(message, timeout, error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
