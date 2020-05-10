const Post = require('mongoose').model('Post');
const {
  transformPost
} = require('./merge');

module.exports = {
  postQueryResolver: {
    posts: async (parent, args, context, info) => {
      try {
        const posts = await Post.find();
        return posts.map(post => transformPost(post));
      } catch (err) {
        throw err;
      }
    }
  },
  postMutationResolver: {
    addPost: async (parent, args, context, info) => {
      try {
        console.log("args:: ", args);

        if (!context.isAuth) throw new Error("Unauthenticated");

        const post = new Post({
          description: args.post.description,
          image: args.post.image,
          title: args.post.title,
          createdDate: new Date(),
          author: context.user._id,
        });


        const result = await post.save();
        return transformPost(result);

      } catch (err) {
        throw err;
      }
    },
    removePost: async (parent, args, context, info) => {
      try {
        const result = await Post.findByIdAndDelete(args.postId);
        return transformPost(result);
      } catch (err) {
        throw err;
      }
    },
  }
};