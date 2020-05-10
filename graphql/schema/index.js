const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    _id: ID!
    username: String!
    phone: Int!
    avatar: String!
    students: [User!]!
    teacher: User!
    email: String!
    type: String!
    isBanned: Boolean!
    hash: String
    salt: String
  }

  input UserInput {
    username: String!
    phone: Int!
    avatar: String
    email: String!
    type: String!
    password: String!
  }

  input UpdateUserInput {
    username: String
    avatar: String
    email: String
    phone: Int
    type: String
    password: String
  }
  
  type Course {
    _id: ID!
    director: User
    teachers:[User!]!
    students:[User!]! 
    name: String!
    email: String!
    description: String!
    image: String
  }
  input CourseInput {
    name: String!
    image: String
    email: String!
    description: String!
  }

  type Post{
    _id: ID!
    title: String!
    description: String!
    image: String
    createdDate: String!
    author: User!
  }
  input PostInput{
    title: String!
    description: String!
    image: String

  }
  type DuremCategory{
    _id: ID!
    name: String!
    durmuud: [Durem!]!
  }
  type Durem{
    _id: ID!
    category: DuremCategory!
    title: String!
    description: String!
    image: String
  }
  input DuremInput{
    title: String!
    description: String!
    image: String
  }
  type Test{
    _id: ID!
    description: String!
    image: String
    hint: String
    inputAnswer: [TestAnswer!]! 
  }
  type TestAnswer {
    content: String
    image: String
    isCorrect: Boolean!
  }
  input TestInput{
    description: String!
    image: String
    hint: String
    inputAnswer: [TestAnswerInput!]!
  }
  input TestAnswerInput {
    content: String
    image: String
    isCorrect: Boolean!
  }
  type Tutorial{
    _id: ID!
    title: String
    description: String
    video: String
    image: String
    comment: [SomeComments]
  }
  type SomeComments{
    commentDescription: String
    createdDate: String
    author: User
  }
  input TutorialInput{
    title: String!
    description: String
    video: String
    image: String
    comment: [CommentInput]
  }
  input CommentInput{
    commentDescription: String
    createdDate: String
    author: User
  }
  input UpdateTutorial {
    title: String
    description: String
    video: String
    image: String
    comment: [CommentInput]
  }
  
  type Chat{
    _id: ID!
    description: String!
    image: String
    sendTo: User!
    sendBy: User!
    createdDate: String!
  }
  input ChatInput{
    description: String!
    image: String
  }
  
  type Schedule{
    _id: ID!
    date: String!
    name: String!
    teacher: User!
    startDate: String!
    endDate: String!
  }
  input EventInput{
    date: String!
    name: String!
  }

  type Exam{
    _id: ID!
  }

  type AuthData {
    _id: ID!
    exp: Int!
    email: String!
    token: String!
    type: String!
  }

  type Query {
    me: User!
    users: [User!]!
    #teacher
    monitorStudents: [User!]!
    schedules: [Schedule!]!
    #client turliin hereglegchded
    generateRandomExam: Exam!
    tutorials: [Tutorial!]!
    duremcategorys: [DuremCategory!]!
    duremuud: [Durem!]!
    tests: [Test!]!
    #course
    courses(studentId: String): [Course!]!
    posts: [Post!]!
    chats: [Chat!]!

  }

  type Mutation {
    login(email: String!, password: String!): AuthData!
    createUser(userInput: UserInput!): User!
    updateUser(userId: String!, updateUserInput: UpdateUserInput!): User!
    banUser(userId: String!): User!
    
    #Admin ii hiih uildel
    createCourse(course: CourseInput!): Course!
    deleteCourse(courseId: String!): Course!
    addDirector(courseId: String, userId: String!): Course!
    removeDirector(courseId: String, userId: String): Course!

    createDuremCategory(name: String!): DuremCategory!
    addDurem(durem: DuremInput!, duremCategoryId: String!): Durem!
    removeDurem(duremId: String!): Durem!
    addTest(test: TestInput!): Test!
    removeTest(testId: String!): Test!
    addTutorial(tutorial: TutorialInput!): Tutorial!
    updateTutorial(tutorialId: String!, updateTutorial: UpdateTutorial!): Tutorial!
    removeTutorial(tutorialId: String): Tutorial!

    #Director hiih uildeluud
    addPost(post: PostInput!): Post!
    removePost(postId: String!): Post!
    updateCourseInfo(course: CourseInput! courseId: String!): Course!
    addStudentToCourse(userId: String! courseId: String!): Course!
    removeStudentFromCourse(userId: String! courseId: String!): Course!
    addTeacherToCourse(userId: String! courseId: String!): Course!
    removeTeacherFromCourse(userId: String! courseId: String!): Course!
    
    #teacher hiih uildel
    addCalendarSchedule(event: EventInput!): Schedule!
    removeCalendarSchedule(scheduleId: String!): Schedule!
    #teacher bolon client
    sendChat(userId: String, chatInput: ChatInput!): Chat!
  }
`;
