import React, { Component } from 'react';

export default class Alert extends Component {
  render() {
    if (this.props.result)
      return (
        <>
          <div className="alert alert-success" role="alert">
            User {this.props.action === 'add' ? ' added ' : ' edited '}
            successfully!
          </div>
        </>
      );
    else
      return (
        <>
          <div className="alert alert-danger" role="alert">
            Something went wrong. User was not
            {this.props.action === 'add' ? ' added' : ' edited'}.
          </div>
        </>
      );
  }
}
