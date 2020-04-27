import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Popup from '../Alert/Popup';
import {
  getUsers,
  setUsers,
  deleteUser,
  resetResponse,
  isEmpty,
  sortByUsername,
  showAlert,
} from '../../redux/actions/UserActions';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorted: this.props.sortedByUsername,
      showModal: false,
      loading: false,
      userId: null, // props for child component and refreshing table on successful delete
    };
    if (!this.props.users.length) this.props.getUsers();
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
  }
  componentDidUpdate() {
    if (!this.props.users.length) this.props.isEmpty();
    const prevUsers = [...this.props.users];
    const newUsers = prevUsers.filter((e) => {
      return e.id !== this.state.userId;
    });
    if (this.props.deleteResponse === 200) {
      this.setState({
        loading: false,
        userId: null,
      });
      this.props.resetResponse();
      this.props.setUsers(newUsers);
      this.props.showAlert(`User deleted succesfully.`);
    }
  }
  toggleModal(e, id) {
    this.setState({
      showModal: true,
      userId: id,
    });
  }
  deleteClick(id) {
    this.props.deleteUser(id);
    this.setState({
      loading: true,
    });
  }

  render() {
    if (this.props._isEmpty) {
      return (
        <tr>
          <td colSpan="7" className="p-5 text-danger">
            <h2>Table is empty. Please add new users.</h2>
          </td>
        </tr>
      );
    } else
      return (
        <>
          {this.props.users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.address.city}</td>
                <td>{user.email}</td>
                <td className="text-center">
                  <Link to={{ pathname: `/edit/${user.id}` }}>
                    <Button variant="warning">
                      {' '}
                      <svg
                        class="bi bi-pencil"
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z"
                          clip-rule="evenodd"
                        />
                      </svg>{' '}
                      Edit
                    </Button>
                  </Link>
                </td>
                <td className="text-center">
                  <Button
                    onClick={(e) => this.toggleModal(e, user.id)}
                    variant="danger"
                  >
                    <svg
                      class="bi bi-trash"
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        clip-rule="evenodd"
                      />
                    </svg>{' '}
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
          {this.state.showModal ? (
            <Popup
              show={this.state.showModal}
              loading={this.state.loading}
              onHide={() => this.setState({ showModal: false })}
              onDeleteClick={() => this.deleteClick(this.state.userId)}
              userid={this.state.userId}
            />
          ) : null}
        </>
      );
  }
}

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.any.isRequired,
  deletedUser: PropTypes.object,
  deleteResponse: PropTypes.number,
  _isEmpty: PropTypes.bool,
  setUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  resetResponse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    users: state.getUsers.items,
    deletedUser: state.deleteUser.deleteUser,
    deleteResponse: state.deleteUser.response,
    _isEmpty: state.getUsers.isEmpty,
    sortedByUsername: state.getUsers.sortedByUsername,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsers()),
    setUsers: (users) => dispatch(setUsers(users)),
    deleteUser: (id) => dispatch(deleteUser(id)),
    resetResponse: () => dispatch(resetResponse()),
    isEmpty: () => dispatch(isEmpty()),
    sortByUsername: () => dispatch(sortByUsername()),
    showAlert: (message, timeout, error) =>
      dispatch(showAlert(message, timeout, error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
