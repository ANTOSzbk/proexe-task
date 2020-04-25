import React, { useEffect, useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

export default function Popup(props) {
  const [isOpen, setIsOpen] = useState(false);
  const modalProps = { ...props };
  delete modalProps.onDeleteClick;
  delete modalProps.loading;
  useEffect(() => {
    console.log(props);
    if (!props.loading && isOpen) props.onHide();
  }, [props, isOpen]);
  const onClick = () => {
    setIsOpen(true);
    props.onDeleteClick();
  };
  return (
    <>
      <Modal {...modalProps}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <span className="p-3 bg-danger rounded-pill text-warning">
            <span role="img" aria-label="x-sign">
              ❌
            </span>{' '}
            Are you sure you want to delete user with{' '}
            <strong>ID {props.userid}</strong>?
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button variant="outline-danger" onClick={onClick}>
            {props.loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="text-black-50">Deleting...</span>
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
