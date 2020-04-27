import React, { useEffect, useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

export default function Popup(props) {
  const [isOpen, setIsOpen] = useState(false);
  const modalProps = { ...props };
  delete modalProps.onDeleteClick;
  delete modalProps.loading;
  useEffect(() => {
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
          <span className="p-3 rounded-pill text-danger">
            <svg
              class="bi bi-trash"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                clip-rule="evenodd"
              />
            </svg>{' '}
            Are you sure you want to delete user with{' '}
            <strong>ID {props.userid}</strong>?
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onClick}>
            {props.loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  className="mr-1"
                  aria-hidden="true"
                />
                Deleting...
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
