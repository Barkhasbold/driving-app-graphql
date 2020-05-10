const Chat = require('mongoose').model('Chat');
const {
  transformChat
} = require('./merge');

module.exports = {
  chatQueryResolver: {
    chats: async (parent, args, context, info) => {
      try {
        const chats = await Chat.find();
        return chats.map(chat => transformChat(chat));
      } catch (err) {
        throw err;
      }
    }
  },
  chatMutationResolver: {
    sendChat: async (parent, args, context, info) => {
      try {
        console.log("args:: ", args);

        if (!context.isAuth) throw new Error("Unauthenticated");

        const chat = new Chat({
          description: args.chatInput.description,
          image: args.chatInput.image,
          sendBy: context.user._id,
          sendTo: args.userId,
        });


        const result = await chat.save();
        return transformChat(result);

      } catch (err) {
        throw err;
      }
    },
  }
};