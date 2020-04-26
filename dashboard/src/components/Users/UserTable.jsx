import React from 'react';
import Users from './Users';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

function UserTable(props) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>
            Username{' '}
            {props.sortedByUsername !== undefined
              ? props.sortedByUsername
                ? '⬆️'
                : '⬇️'
              : null}
          </th>
          <th>City</th>
          <th>Email</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <Users />
      </tbody>
    </Table>
  );
}

const mapStateToProps = (state) => {
  return {
    sortedByUsername: state.getUsers.sortedByUsername,
  };
};

export default connect(mapStateToProps, null)(UserTable);
