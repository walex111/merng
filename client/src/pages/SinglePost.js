import React, { useContext, useState, useRef } from "react";
import gql from "graphql-tag";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import {
  Grid,
  Image,
  Card,
  Button,
  Icon,
  Label,
  Form,
  Popup,
} from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

import { CREATE_COMMENT_MUTATION } from "../utils/graphql";

const SinglePost = (props) => {
  let { postId } = useParams();
  const { user } = useContext(AuthContext);

  const commentInputRef = useRef(null);

  const [comment, setComment] = useState("");
  const { data: { getPost } = {}, loading } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function deletePostCallback() {
    props.history.push("/");
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = loading;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      commentCount,
      likes,
      likeCount,
    } = getPost;

    postMarkup = (
      <Grid columns={3} divided style={{ marginTop: 20 }}>
        <Grid.Row>
          <Grid.Column>
            <Image
              size="mini"
              floated="right"
              rounded
              src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
            />
          </Grid.Column>
          <Grid.Column>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Popup
                  content="Comment on Post"
                  trigger={
                    <Button
                      as="div"
                      labelPosition="right"
                      onClick={() => console.log("comment on post")}
                    >
                      <Button color="blue" basic>
                        <Icon name="comment"></Icon>
                      </Button>
                      <Label basic color="blue" pointing="left">
                        {commentCount}
                      </Label>
                    </Button>
                  }
                />
                {user && user.username === username && (
                  <DeleteButton
                    postId={id}
                    commentId={id}
                    callback={deletePostCallback}
                  />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment ||:</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment..."
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button purple"
                        disabled={comment.trim() === ""}
                        onClick={createComment}
                      >
                        Post
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>
                    {moment(comment.createdAt).fromNow(true)}
                  </Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
};

const FETCH_POST_QUERY = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;

export default SinglePost;
