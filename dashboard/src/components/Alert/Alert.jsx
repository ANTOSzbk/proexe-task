import React, { Component } from 'react';
import './Alert.css';
import { showAlert } from '../../redux/actions/UserActions';
import { connect } from 'react-redux';

class Alert extends Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this.props.showAlert();
    }, this.props.timeout);
  }

  render() {
    if (!this.props.show) return null;
    return (
      <>
        <div
          className={
            this.props.isError ? 'alert alert-error' : 'alert alert-success'
          }
          role="alert"
          style={{ '--timeout': this.props.timeout / 1000 }}
        >
          {this.props.message}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    show: state.alert.show,
    message: state.alert.message,
    timeout: state.alert.timeout,
    isError: state.alert.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showAlert: () => dispatch(showAlert()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
