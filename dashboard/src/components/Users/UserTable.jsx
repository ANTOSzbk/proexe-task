import React from 'react';
import Users from './Users';
import { Table } from 'react-bootstrap';

export default function UserTable(props) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
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
