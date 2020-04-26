import React from 'react';
import UserTable from '../../components/Users/UserTable';
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
          <Button variant="outline-secondary" onClick={handleClick}>
            <span role="img" aria-label="shuffletrackssign">
              🔀
            </span>{' '}
            Sort by Username
          </Button>
        </NavItem>
        <NavItem className="mr-1 mb-2 align-self-end">
          <Link to={{ pathname: `/add` }}>
            <Button variant="primary">
              <span role="img" aria-label="heavyplussign">
                ➕
              </span>{' '}
              Add User
            </Button>
          </Link>
        </NavItem>
      </Nav>
      <UserTable />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    sortByUsername: () => dispatch(sortByUsername()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
