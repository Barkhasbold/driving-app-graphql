const User = require('mongoose').model('User');
const {
  transformUser
} = require('./merge');

module.exports = {
  authQueryResolver: {
    me: async (parent, args, context, info) => {
      if (!context.isAuth) {
        throw new Error('Unauthenticated!');
      }
      const currentUser = await User.findById(context.user._id);
      return transformUser(currentUser);
    },
    users: async (parent, args, context, info) => {
      const users = await User.find();
      return users.map(user => {
        return transformUser(user);
      });
    }
  },
  authMutationResolver: {
    login: async (parent, {
      email,
      password
    }, context, info) => {
      const user = await User.findOne({
        email: email
      });
      if (!user) {
        throw new Error('User does not exist!');
      }

      if (!user.validatePassword(password)) {
        throw new Error('Password is incorrect!');
      }

      if (user.isBanned) {
        throw new Error('You are banned!')
      }

      const token = await user.generateJWT();

      return {
        _id: user.id,
        email: user._doc.email,
        token: token,
        type: user._doc.type,
        exp: 1,
      };
    },
    updateUser: async (parent, {
      userId,
      updateUserInput = {}
    }, context, info) => {
      try {
        const user = await User.findById(userId);

        const {
          username,
          email,
          avatar,
          type,
          phone,
          isBanned,
          password
        } = updateUserInput;

        if (username) user.username = username;
        if (email) user.email = email;
        if (avatar) user.avatar = avatar;
        if (type) user.type = type;
        if (phone) user.phone = phone;
        if (typeof isBanned === 'boolean') user.isBanned = isBanned;

        if (password) user.setPassword(password);

        const result = await user.save();

        return transformUser(result);

      } catch (err) {
        throw err;
      }
    },
    createUser: async (parent, args, context, info) => {
      try {
        console.log("args:: ", args)
        const existingUser = await User.findOne({
          email: args.userInput.email
        });
        if (existingUser) {
          throw new Error('User exists already.');
        }

        const user = new User({
          username: args.userInput.username,
          email: args.userInput.email,
          avatar: args.userInput.avatar,
          type: args.userInput.type,
          phone: args.userInput.phone,
          isBanned: false,
        });

        user.setPassword(args.userInput.password);

        const result = await user.save();

        return transformUser(result);

      } catch (err) {
        throw err;
      }
    },
    banUser: async (parent, args, context, info) => {
      if (!context.isAuth) throw new Error("Permission denied!");
      const currentUser = await User.findById(context.user._id);

      if (currentUser._doc.type === "CLIENT") throw new Error("Permission denied!");
      const existingUser = await User.findById(args.userId);

      if (!existingUser) throw new Error("User not found!");
      existingUser.isBanned = true;

      const result = await existingUser.save();
      return transformUser(result);
    },
  }
};