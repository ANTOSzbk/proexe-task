import React, { Component } from 'react';
import { getUser, resetResponse } from '../../redux/actions/UserActions';
import { Table, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidUpdate() {
    const status = this.props.responseStatus;
    if (status && this.state.loading) {
      this.setState({ loading: false });
    }
  }
  componentDidMount() {
    if (this.props.id !== this.props.apiUser.id) {
      this.props.getUser(this.props.id);
    }
  }
  componentWillUnmount() {
    this.props.resetResponse();
  }

  render() {
    const apiUser = this.props.apiUser;
    const currentUser = this.props.users.find(
      (user) => user.id.toString() === this.props.id
    );
    return (
      <Table striped bordered hover className="mb-3">
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
            {!this.props.current && this.state.loading ? (
              <td colSpan="5" className="p-3 text-center">
                <Spinner animation="border" role="status" size="sm">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </td>
            ) : null}
            {!this.props.current &&
              this.props.responseStatus &&
              this.props.responseStatus !== 200 && (
                <td colSpan="5" className="p-3 text-danger">
                  No {this.props.current ? 'current' : 'original'} record found
                  for this user. <br />
                  Server responded with status {this.props.responseStatus}.
                </td>
              )}
            {!this.props.current && this.props.responseStatus === 200 && (
              <>
                <td>{apiUser.id}</td>
                <td>{apiUser.name}</td>
                <td>{apiUser.username}</td>
                <td>{apiUser.address.city}</td>
                <td>{apiUser.email}</td>
              </>
            )}
            {this.props.current && this.props.users.length && (
              <>
                <td>{currentUser.id}</td>
                <td>{currentUser.name}</td>
                <td>{currentUser.username}</td>
                <td>{currentUser.address.city}</td>
                <td>{currentUser.email}</td>
              </>
            )}
          </tr>
        </tbody>
      </Table>
    );
  }
}

User.propTypes = {
  getUser: PropTypes.func.isRequired,
  resetResponse: PropTypes.func.isRequired,
  apiUser: PropTypes.object,
  responseStatus: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    apiUser: state.getUser.item,
    users: state.getUsers.items,
    responseStatus: state.getUser.response,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => dispatch(getUser(id)),
    resetResponse: () => dispatch(resetResponse()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
