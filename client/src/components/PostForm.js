import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const PostForm = () => {
  const { values, onSubmit, onChange } = useForm(createPostCallback, {
    body: "",
  });
  //TODO: create post not populating in instant
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      const posts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: posts } });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a Post ||:</h2>
        <Form.Field>
          <Form.Input
            placeholder="SMIGGLE..."
            name="body"
            error={error ? true : false}
            onChange={onChange}
            value={values.body}
          />
          <Button type="submit" color="purple">
            SUBMIT
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.message}</li>
          </ul>
        </div>
      )}
    </>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
