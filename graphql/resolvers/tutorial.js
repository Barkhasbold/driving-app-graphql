const Tutorial = require('mongoose').model('Tutorial');
const {
  transformTutorial
} = require('./merge');

module.exports = {
  tutorialQueryResolver: {
    tutorials: async (parent, args, context, info) => {
      try {
        const tutorials = await Tutorial.find();
        return tutorials.map(tutorial => transformTutorial(tutorial));
      } catch (err) {
        throw err;
      }
    }
  },
  tutorialMutationResolver: {
    // addTutorial: async (parent, args, context, info) => {
    //   return {
    //     _id: "fdsaf",
    //     title: "sdfasf",
    //     description: "String",
    //     video: "String",
    //     image: "String",
    //   }
    // }

    addTutorial: async (parent, args, context, info) => {
      try {
        console.log("args:: ", args);
        const existingTutorial = await Tutorial.findOne({
          title: args.tutorial.title
        });
        if (existingTutorial) {
          throw new Error('Tutorial exists already.');
        }

        const tutorial = new Tutorial({
          title: args.tutorial.title,
          description: args.tutorial.description,
          image: args.tutorial.image,
          video: args.tutorial.video,
          comment: args.tutorial.comment,
        });


        const result = await tutorial.save();
        return transformTutorial(result);

      } catch (err) {
        throw err;
      }
    },
    removePost: async (parent, args, context, info) => {
      try {
        const result = await Course.findByIdAndDelete(args.postId);
        return transformCourse(result);
      } catch (err) {
        throw err;
      }
    },
    updateTutorial: async (parent, {
      tutorialId,
      tutorial = {}
    }, context, info) => {
      try {
        const currentTutorial = await Tutorial.findById(tutorialId);
        if (!tutorial) throw new Error("Tutorial not exists");
        const {
          title,
          description,
          video,
          image,
          comment
        } = tutorial;

        console.log(title,video,image,description, comment);

        if (title) currentTutorial.title = title;
        if (comment) currentTutorial.comment = comment;
        if (image) currentTutorial.image = image;
        if (video) currentTutorial.video = video;
        if (description) currentTutorial.description = description;
        if (comment) currentTutorial.comment = comment;

        const result = await currentTutorial.save();

        console.log(result);
        return transformTutorial(result);

      } catch (err) {
        throw err;
      }
    },
  }
};