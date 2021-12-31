import React, { useContext } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Card, Icon, Label, Image, Button, Popup } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "./DeleteButton";

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content as={Link} to={`/posts/${id}`}>
        <Image
          size="mini"
          floated="right"
          rounded
          src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Popup
          content="Comment on post"
          inverted
          trigger={
            <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
              <Button color="blue" basic>
                <Icon name="comment"></Icon>
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          }
        />

        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
