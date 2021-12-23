const Post = require("../../models/Post");
const checkAuth = require("../../util/check-auth");
const { ApolloError } = require("apollo-server-errors");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new ApolloError("Empty Comment", {
          errors: {
            body: "Comment must not be empty",
          },
        });
      }
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw ApolloError("Post not found");
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comment.findIndex((c) => c.id === commentId);
        if (post.comments[commentIndex] === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new ApolloError("Action not allowed");
        }
      } else {
        throw new ApolloError("Post not found");
      }
    },
  },
};
