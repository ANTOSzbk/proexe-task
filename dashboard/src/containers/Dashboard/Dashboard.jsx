import React from 'react';
import UserTable from '../../components/Users/UserTable';
import Alert from '../../components/Alert/Alert';
import { Nav, NavItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sortByUsername } from '../../redux/actions/UserActions';

function Dashboard(props) {
  const handleClick = () => {
    props.sortByUsername();
  };
  return (
    <div>
      <header>
        <h1>Dashboard</h1>
      </header>
      <Nav pills="true">
        <NavItem className="ml-auto mr-1 mb-2 align-self-end">
          <Button variant="secondary" onClick={handleClick}>
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
            </svg>{' '}
            Sort by Username
          </Button>
        </NavItem>
        <NavItem className="mr-1 mb-2 align-self-end">
          <Link to={{ pathname: `/add` }}>
            <Button variant="success">
              <svg
                className="bi bi-person-plus"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM1.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM6 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0zm4.5 0a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13V5.5a.5.5 0 01.5-.5z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M13 7.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z"
                  clipRule="evenodd"
                />
              </svg>{' '}
              Add User
            </Button>
          </Link>
        </NavItem>
      </Nav>
      <UserTable />
      {props.alert ? <Alert /> : null}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    alert: state.alert.show,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sortByUsername: () => dispatch(sortByUsername()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
