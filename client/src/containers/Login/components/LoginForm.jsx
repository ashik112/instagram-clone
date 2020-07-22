/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {
  Button, Form, InputGroup, Spinner, FormGroup, Input, InputGroupAddon,
} from 'reactstrap';
import { Field, Formik, Form as ForkmikForm } from 'formik';

const LoginForm = ({ loading, onLogIn }) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={(values) => {
        onLogIn({ ...values });
      }}
    >
      {({ handleSubmit, values }) => (
        <Form as={ForkmikForm}>
          <Field
            name="username"
          >
            {({ field }) => (
              <FormGroup>
                <InputGroup className="mb-2">
                  <Input
                    bsSize="sm"
                    name="username"
                    id="username"
                    type="text"
                    placeholder="username, or email"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </InputGroup>
              </FormGroup>
            )}
          </Field>
          <Field
            name="password"
          >
            {({ field }) => (
              <FormGroup>
                <InputGroup className="mb-2">
                  <Input
                    bsSize="sm"
                    name="password"
                    id="password"
                    autoComplete="on"
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="password"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {
                    values.password && (
                      <InputGroupAddon addonType="append">
                        { !isPasswordVisible && <Button onClick={() => setPasswordVisibility(true)} size="sm" type="button" color="secondary">Show</Button> }
                        { isPasswordVisible && <Button onClick={() => setPasswordVisibility(false)} size="sm" type="button" color="secondary">Hide</Button> }
                      </InputGroupAddon>
                    )
                  }
                </InputGroup>
              </FormGroup>
            )}
          </Field>
          <Button
            size="sm"
            block
            className="text-light"
            type="submit"
            disabled={loading || (!values.username || !values.password)}
            onClick={handleSubmit}
          >
            {
              loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )
            }
            &nbsp;&nbsp;Log In
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
