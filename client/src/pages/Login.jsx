import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { useForm } from "../utils/hooks";

const Login = () => {
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });
  let navigate = useNavigate();
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      navigate("/");
    },
    // TODO: figure out the error displaying
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.code.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
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
          label="Password"
          placeholder="Password..."
          name="password"
          error={errors.password ? true : false}
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Button type="submit" color="purple">
          Login
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
