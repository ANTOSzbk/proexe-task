import React, { Component } from 'react';
import { getUser } from '../../redux/actions/UserActions';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class User extends Component {
  componentDidMount() {
    if (this.props.id !== this.props.user.id) this.props.getUser(this.props.id);
  }
  render() {
    const user = this.props.user;
    if (!user) return null;
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>City</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.address.city}</td>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

User.propTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.getUser.item,
  };
};

export default connect(mapStateToProps, { getUser })(User);
