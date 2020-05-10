const Schedule = require('mongoose').model('Schedule');
const {
  transformSchedule
} = require('./merge');

module.exports = {
  scheduleQueryResolver: {
    schedules: async (parent, args, context, info) => {
      try {
        const schedules = await Schedule.find();
        return schedules.map(schedule => transformSchedule(schedule));
      } catch (err) {
        throw err;
      }
    }
  },
  scheduleMutationResolver: {
    addCalendarSchedule: async (parent, args, context, info) => {
      try {
        console.log("args:: ", args);
        if (!context.isAuth) {
          throw new Error('Unauthenticated!');
        }

        const schedule = new Schedule({
          teacher: context.user._id,
          name: args.event.name,
          date: args.event.date,
        });

        const result = await schedule.save();
        return transformSchedule(result);
      } catch (err) {
        throw err;
      }
    },
    removeCalendarSchedule: async (parent, args, context, info) => {
      try {

        const result = await Schedule.findByIdAndDelete(args.scheduleId);
        return transformSchedule(result);

      } catch (err) {
        throw err;
      }
    },
  }
};