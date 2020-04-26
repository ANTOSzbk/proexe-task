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
      showModal: false,
      loading: false,
      userId: null, // props for child component and refreshing table on successful delete
    };
    if (!this.props.users.length) this.props.getUsers();
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
  }
  componentDidUpdate() {
    this.props.isEmpty();
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
