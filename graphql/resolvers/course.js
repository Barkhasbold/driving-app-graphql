const mongoose = require('mongoose');
const User = mongoose.model('User');
const Course = mongoose.model('Course');
const {
  transformCourse
} = require('./merge');

module.exports = {
  courseQueryResolver: {
    courses: async (parent, args, context, info) => {
      try {
        const courses = await Course.find();
        return courses.map(course => transformCourse(course));
      } catch (err) {
        throw err;
      }
    }
  },
  courseMutationResolver: {
    createCourse: async (parent, args, context, info) => {
      try {
        console.log("args:: ", args, context.user);

        const existingCourse = await Course.findOne({
          name: args.course.name
        });
        if (existingCourse) {
          throw new Error('Course exists already.');
        }

        const course = new Course({
          name: args.course.name,
          description: args.course.description,
          image: args.course.image,
          email: args.course.email,
          director: context.user._id ? context.user._id: "",
          students: [],
          teacher: []
        });

        const result = await course.save();
        return transformCourse(result);

      } catch (err) {
        throw err;
      }
    },
    deleteCourse: async (parent, args, context, info) => {
      try {
        const result = await Course.findByIdAndDelete(args.courseId);
        return transformCourse(result);
      } catch (err) {
        throw err;
      }
    },
    addStudentToCourse: async (parent, args, context, info) => {
      try {
        const course = await Course.findById(args.courseId);
        if (!course) throw new Error("course not exists");
        const adduser = await User.findById(args.userId);
        if (!adduser) throw new Error("user not exists");

        for (const user of course.students) {
          if (user.toString() === adduser._id.toString()) {
            throw new Error("user already exists");
          }
        }

        course.students.push(adduser._id);

        const result = await course.save();
        return transformCourse(result);
      } catch (err) {
        throw err;
      }
    },
    removeStudentFromCourse: async (parent, args, context, info) => {
      try {
        const course = await Course.findById(args.courseId);
        if (!course) throw new Error("course not exists");
        const removeuser = await User.findById(args.userId);
        if (!removeuser) throw new Error("user not exists");

        course.students = course.students.remove({
          _id: removeuser._id
        });
        console.log(course.students);
        const result = await course.save();
        return transformCourse(result);
      } catch (err) {
        throw err;
      }
    },
    addTeacherToCourse: async (parent, args, context, info) => {
      try {
        const course = await Course.findById(args.courseId);
        if (!course) throw new Error("course not exists");
        const adduser = await User.findById(args.userId);
        if (!adduser) throw new Error("user not exists");

        for (const user of course.teachers) {
          if (user.toString() === adduser._id.toString()) {
            throw new Error("user already exists");
          }
        }

        course.teachers.push(adduser._id);

        const result = await course.save();
        return transformCourse(result);
      } catch (err) {
        throw err;
      }
    },
    removeTeacherFromCourse: async (parent, args, context, info) => {
      try {
        const course = await Course.findById(args.courseId);
        if (!course) throw new Error("course not exists");
        const removeuser = await User.findById(args.userId);
        if (!removeuser) throw new Error("user not exists");

        course.teachers = course.teachers.remove({
          _id: removeuser._id
        });
        console.log(course.teachers);
        const result = await course.save();
        return transformCourse(result);
      } catch (err) {
        throw err;
      }
    },
    addDirector: async (parent, args, context, info) => {
      try {
        const course = await Course.findById(args.courseId);
        if (!course) throw new Error("course not exists");

        const adddirector = await User.findById(args.userId);
        if (!adddirector) throw new Error("user not exists");


        course.director = mongoose.Types.ObjectId(adddirector._id);
        const result = await course.save();
        console.log(result);
        return transformCourse(result);
      } catch (err) {
        throw err;
      }
    },
    removeDirector: async (parent, args, context, info) => {
      try {
        const course = await Course.findById(args.courseId);
        if (!course) throw new Error("course not exists");
        const removedirector = await User.findById(context.userId);
        if (!removedirector) throw new Error("user not exists");

        course.director = course.director.remove({
          _id: removedirector._id
        });
        console.log(course.director);
        const result = await course.save();
        return transformCourse(result);
      } catch (err) {
        throw err;
      }
    },
    updateCourseInfo: async (parent, {
      courseId,
      course = {}
    }, context, info) => {
      try {
        const currentCourse = await Course.findById(courseId);
        if (!course) throw new Error("Course not exists");
        const {
          name,
          email,
          image,
          description
        } = course;

        console.log(name,email,image,description);

        if (name) currentCourse.name = name;
        if (email) currentCourse.email = email;
        if (image) currentCourse.image = image;
        if (description) currentCourse.description = description;

        const result = await currentCourse.save();

        console.log(result);
        return transformCourse(result);

      } catch (err) {
        throw err;
      }
    },
  }
};