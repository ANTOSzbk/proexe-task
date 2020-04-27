import React from 'react';
import Users from './Users';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { sortByUsername } from '../../redux/actions/UserActions';

function UserTable(props) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr style={{ userSelect: 'none' }}>
          <th>ID</th>
          <th>Name</th>
          <th onClick={() => props.sortByUsername()}>
            Username{' '}
            {props.sortedByUsername !== undefined ? (
              props.sortedByUsername ? (
                <svg
                  className="bi bi-chevron-up"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.646 4.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 5.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="bi bi-chevron-down"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"
                    clipRule="evenodd"
                  />
                </svg>
              )
            ) : (
              <svg
                className="bi bi-arrow-up-down"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M10.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L11 3.707 8.354 6.354a.5.5 0 11-.708-.708l3-3zm-9 7a.5.5 0 01.708 0L5 12.293l2.646-2.647a.5.5 0 11.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M5 2.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V3a.5.5 0 01.5-.5z"
                  clipRule="evenodd"
                />
              </svg>
            )}
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

const mapDispatchToProps = (dispatch) => {
  return {
    sortByUsername: () => dispatch(sortByUsername()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
