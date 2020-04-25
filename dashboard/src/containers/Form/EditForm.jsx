import React, { useEffect, useState } from 'react';
import User from '../../components/User/User';
import { useParams } from 'react-router-dom';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import {
  addUser,
  editUser,
  setUsers,
  getUsers,
  pushUser,
  resetResponse,
} from '../../redux/actions/UserActions';

function EditForm(props) {
  const { id } = useParams();
  const history = useHistory();
  let { editedUser, addedUser } = props;
  const { handleSubmit, register, errors } = useForm();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const users = [...props.users];
    if (props.editResponse === 200) {
      for (let i in users)
        if (users[i].id.toString() === id) {
          users[i].name = props.editedUser.name;
          users[i].email = props.editedUser.email;
          props.setUsers(users);
          props.resetResponse();
          setLoading(false);
          setRedirect(true);
          if (redirect) history.goBack();
        }
    }
    //eslint-disable-next-line
  }, [editedUser]);

  useEffect(() => {
    if (props.addResponse === 201) {
      props.pushUser(props.addedUser);
    }
    props.resetResponse();
    setLoading(false);
    setRedirect(true);
    if (redirect) history.goBack();
    //eslint-disable-next-line
  }, [addedUser]);

  const onSubmit = (values) => {
    const rName = values.name;
    const rEmail = values.email;
    setLoading(true);
    if (id) {
      props.editUser(id, rName, rEmail);
    } else {
      props.addUser(rName, rEmail);
    }
  };
  return (
    <>
      <div>
        <h1 className="mb-2 border-bottom">
          {id ? `Edit user` : `Add new user`}
        </h1>
        {id ? (
          <>
            <h4 className="mb-2">Original record</h4>
            <User id={id} />
          </>
        ) : null}
      </div>
      <div className="w-50 p-3 border rounded-lg">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              ref={register({
                validate: (value) => value !== 'admin' || 'Nice try!',
                required: 'Name is required.',
                pattern: {
                  value: /^([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}$/i,
                  message: 'Invalid name. Example: John Smith',
                },
              })}
              type="name"
              name="name"
              placeholder="Enter new user name"
              required
            />
            <Form.Text className="text-danger">
              {errors.name && errors.name.message}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              ref={register({
                required: 'Email is required.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address.',
                },
              })}
              placeholder="Enter new email"
              required
            />
            <Form.Text className="text-danger">
              {errors.email && errors.email.message}
            </Form.Text>
          </Form.Group>
          <Button
            onClick={handleSubmit(onSubmit)}
            className="m-1"
            variant="outline-primary"
            type="submit"
          >
            {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
          </Button>
          <Link to={{ pathname: '/' }}>
            <Button className="m-1" variant="outline-danger" type="cancel">
              Cancel
            </Button>
          </Link>
        </Form>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.getUsers.items,
    editedUser: state.editUser.editUser,
    addedUser: state.addUser.addUser,
    editResponse: state.editUser.response,
    addResponse: state.addUser.response,
    success: state.getUsers.success,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (name, email) => dispatch(addUser(name, email)),
    editUser: (id, name, email) => dispatch(editUser(id, name, email)),
    setUsers: (users) => {
      dispatch(setUsers(users));
    },
    getUsers: () => dispatch(getUsers()),
    pushUser: (user) => {
      dispatch(pushUser(user));
    },
    resetResponse: () => dispatch(resetResponse()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
