const {
  authQueryResolver,
  authMutationResolver
} = require('./auth');
const {
  tutorialQueryResolver,
  tutorialMutationResolver
} = require('./tutorial');
const {
  courseQueryResolver,
  courseMutationResolver
} = require('./course');
const {
  testQueryResolver,
  testMutationResolver
} = require('./test');
const {
  postQueryResolver,
  postMutationResolver
} = require('./post');
const {
  chatQueryResolver,
  chatMutationResolver,
} = require('./chat');
const {
  scheduleQueryResolver,
  scheduleMutationResolver,
} = require('./schedule');
const { duremQueryResolver, duremMutationResolver, } = require('./durem');
// const { QueryResolver, MutationResolver, } = require('./');
// const { QueryResolver, MutationResolver, } = require('./');
// const { QueryResolver, MutationResolver, } = require('./');

const rootResolver = {
  Query: {
    ...authQueryResolver,
    ...tutorialQueryResolver,
    ...courseQueryResolver,
    ...testQueryResolver,
    ...postQueryResolver,
    ...duremQueryResolver,
    ...chatQueryResolver,
    // ...examQueryResolver,
    ...scheduleQueryResolver,
  },
  Mutation: {
    ...authMutationResolver,
    ...tutorialMutationResolver,
    ...courseMutationResolver,
    ...testMutationResolver,
    ...postMutationResolver,
    ...duremMutationResolver,
    ...chatMutationResolver,
    // ...examMutationResolver,
    ...scheduleMutationResolver,
  }
}

module.exports = rootResolver;