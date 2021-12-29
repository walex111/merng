import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";

const Register = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  let navigate = useNavigate();
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      navigate("/");
    },
    // TODO: figure out the error displaying
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.code.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          error={errors.username ? true : false}
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          tabIndex={0}
          label="Email"
          placeholder="Email..."
          name="email"
          error={errors.email ? true : false}
          type="email"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          error={errors.password ? true : false}
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          error={errors.confirmPassword ? true : false}
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" color="purple">
          REGISTER
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div>
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
