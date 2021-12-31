import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

import { Grid, Transition } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const Home = (props) => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3} divided>
      <Grid.Row className="h-page_title">
        <h1>Recent Posts</h1>
        <p>
          Please Login with: Username ||:<span className="home-span">SO</span>{" "}
          and Password||: <span className="home-span">300300</span>
        </p>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {data.getPosts &&
              data.getPosts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} postId={post.id} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
