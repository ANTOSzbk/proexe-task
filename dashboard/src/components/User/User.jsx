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
    if (this.props.id !== this.props.user.id) {
      this.props.getUser(this.props.id);
    }
  }
  componentWillUnmount() {
    this.props.resetResponse();
  }

  render() {
    const user = this.props.user;
    if (!user) return null;
    return (
      <Table striped bordered hover className="mb-5">
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
            {this.state.loading ? (
              <td colSpan="5" className="p-3 text-center">
                <Spinner animation="border" role="status" size="sm">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </td>
            ) : null}
            {this.props.responseStatus && this.props.responseStatus !== 200 && (
              <td colSpan="5" className="p-3 text-danger">
                No original record found for this user. <br />
                Server responded with status {this.props.responseStatus}.
              </td>
            )}
            {this.props.responseStatus === 200 && (
              <>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.address.city}</td>
                <td>{user.email}</td>
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
  user: PropTypes.object,
  responseStatus: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    user: state.getUser.item,
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
