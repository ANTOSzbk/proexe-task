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
} from '../../redux/actions/UserActions';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorted: this.props.sortedByUsername,
      tableEmpty: false,
      showModal: false,
      loading: false,
      userId: 0, // for child component - <Popout/> - to show info[id] of selected User
      userID: 0, // for async [JSON API] and static [browser memory] table update
    };
    this.props.isEmpty();
    if (!this.props.users.length) this.props.getUsers();
    this.toggleModal = this.toggleModal.bind(this);
  }
  componentDidUpdate() {
    console.log('Update userlisty');
    this.props.isEmpty();
    this.props.setUsers(this.props.users);
    const prevUsers = [...this.props.users];
    const newUsers = prevUsers.filter((e) => {
      return e.id !== this.state.userID;
    });
    if (this.props.deleteResponse === 200) {
      this.setState({
        loading: false,
      });
      this.props.resetResponse();
      this.props.setUsers(newUsers);
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
      userID: id,
    });
  }

  render() {
    if (this.props._isEmpty) {
      return (
        <>
          <tr>
            <td className="p-5 border-right text-danger">
              Table is empty. Please add new users.
            </td>
          </tr>
        </>
      );
    }
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
                  <Button variant="info">Edit</Button>
                </Link>
              </td>
              <td className="text-center">
                <Button
                  onClick={(e) => this.toggleModal(e, user.id)}
                  variant="danger"
                >
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
  users: PropTypes.array.isRequired,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
