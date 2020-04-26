import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form as BForm, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Form needs to be functional component because of dependency "react-hook-form"
function Form(props) {
  const { handleSubmit, register, errors } = useForm();
  return (
    <div className="w-50 p-3 rounded-lg border">
      <BForm onSubmit={handleSubmit(props.submitFunction)}>
        <BForm.Group controlId="formName">
          <BForm.Label>
            <h6>Name</h6>
          </BForm.Label>
          <BForm.Control
            ref={register({
              validate: (value) => value !== 'admin' || 'Nice try!',
              required: 'Name is required.',
              pattern: {
                value: /^([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}$/i,
                message:
                  'Invalid name, only alphabetical characters. Example: John Smith',
              },
            })}
            type="name"
            name="name"
            placeholder="Enter new user name"
            required
          />
          <BForm.Text className="text-danger">
            {errors.name && errors.name.message}
          </BForm.Text>
        </BForm.Group>

        <BForm.Group controlId="formEmail">
          <BForm.Label>
            <h6>Email</h6>
          </BForm.Label>
          <BForm.Control
            type="email"
            name="email"
            ref={register({
              required: 'Email is required.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address.',
              },
            })}
            placeholder="Enter new email"
            required
          />
          <BForm.Text className="text-danger">
            {errors.email && errors.email.message}
          </BForm.Text>
        </BForm.Group>
        <Button
          onClick={handleSubmit(props.submitFunction)}
          className="mt-2 m-1"
          variant="outline-primary"
          type="submit"
        >
          {props.loading ? (
            <>
              <Spinner animation="border" size="sm" className="mr-1" />
              Processing...
            </>
          ) : (
            'Submit'
          )}
        </Button>
        <Link
          to={{ pathname: props.cancelRedirect ? props.cancelRedirect : null }}
        >
          <Button className="mt-2 m-1" variant="outline-danger" type="cancel">
            Cancel
          </Button>
        </Link>
      </BForm>
    </div>
  );
}

export default Form;
