const DataLoader = require('dataloader');

const User = require('../../models/user');
const Durem = require('../../models/durem');
const DuremCategory = require('../../models/duremCategory');
const {
  dateToString
} = require('../../helpers/date');

// const postLoader = new DataLoader(postIds => {
//   return postsHandle(postIds);
// });

// const singlePostLoader = new DataLoader(postIds => {
//   return Post.find({ _id: { $in: postIds } });
// });

const userLoader = new DataLoader(userIds => {
  return User.find({
    _id: {
      $in: userIds
    }
  });
});

const duremCategoryLoader = new DataLoader(duremCategoryIds => {
  return DuremCategory.find({
    _id: {
      $in: duremCategoryIds
    }
  });
});

// const commentLoader = new DataLoader(commentIds => {
//   return commentsHandle(commentIds);
// })

// const categoryLoader = new DataLoader(categoryIds => {
//   return Category.find({ _id: { $in: categoryIds } });
// });

// const commentsHandle = async commentIds => {
//   try {
//     const comments = await Comment.find({ _id: { $in: commentIds } }).sort({createdDate: -1});

//     return comments.map(comment => {
//       return transformComment(comment);
//     });
//   } catch (err) {
//     throw err;
//   }
// }

const usersHandle = async userIds => {
  try {
    const users = await User.find({
      _id: {
        $in: userIds
      }
    });

    return users.map(user => {
      return transformUser(user);
    });
  } catch (err) {
    throw err;
  }
};

const durmuudHandle = async duremIds => {
  try {
    const durmuud = await Durem.find({
      _id: {
        $in: duremIds
      }
    });

    return durmuud.map(durem => {
      return transformDurem(durem);
    });
  } catch (err) {
    throw err;
  }
}

// const singlePost = async postId => {
//   try {
//     if(!postId) return null;

//     const post = await singlePostLoader.load(postId.toString());
//     return transformPost(post);
//   } catch (err) {
//     throw err;
//   }
// };

const user = async userId => {
  try {
    if (!userId) return null;
    const user = await userLoader.load(userId.toString());
    return transformUser(user);
  } catch (err) {
    throw err;
  }
};

const duremCategoryLoad = async duremCategoryId => {
  try {
    if (!duremCategoryId) return null;
    const duremCategory = await duremCategoryLoader.load(duremCategoryId.toString());
    return transformDuremCategory(duremCategory);
  } catch (err) {
    throw err;
  }
}
// const singleCategory = async categoryId => {
//   try {
//     if(!categoryId) return null;

//     const singleCategory = await categoryLoader.load(categoryId.toString());
//     return transformCategory(singleCategory);

//   } catch (err) {
//     throw err;
//   }
// };

const transformUser = user => {
  return {
    ...user._doc,
    _id: user.id,
    hash: null,
    salt: null,
  }
}


const transformTutorial = tutorial => {
  return {
    ...tutorial._doc,
    _id: tutorial.id,
  }
}

const transformCourse = course => {
  return {
    ...course._doc,
    _id: course.id,
    students: usersHandle.bind(this, course._doc.students),
    teachers: usersHandle.bind(this, course._doc.teachers),
    director: user.bind(this, course.director),
  }
}

const transformTest = test => {
  return {
    ...test._doc,
    _id: test.id,
  }
}

const transformChat = chat => {
  return {
    ...chat._doc,
    _id: chat.id,
    sendBy: user.bind(this, chat.sendBy),
    sendTo: user.bind(this, chat.sendTo),
    createdDate: dateToString(chat._doc.createdDate),
  }
}

const transformSchedule = schedule => {
  return {
    _id: schedule.id,
    teacher: user.bind(this, schedule.teacher),
    name: schedule.name,
    startDate: dateToString(schedule.date).substr(0, 10) + ' 00:00:00',
    endDate: dateToString(schedule.date).substr(0, 10) + ' 23:59:59',
  }
}

const transformDurem = durem => {
  return {
    ...durem._doc,
    _id: durem.id,
    category: duremCategoryLoad.bind(this, durem._doc.category) 
  }
}

const transformDuremCategory = duremCategory => {
  return {
    ...duremCategory._doc,
    _id: duremCategory.id,
    durmuud: durmuudHandle.bind(this, duremCategory._doc.durmuud)
  }
}
// const transformCategoryForPost = async postId => {
//   const categoryIds = await PostAndCategory.distinct('category', {post: postId});
//   const categories = await categoryLoader.loadMany(categoryIds.map(id => id.toString()));
//   return categories.map(category => {
//     return {
//       ...transformCategory(category)
//     }
//   })
// }

const transformPost = post => {
  return {
    ...post._doc,
    _id: post.id,
    createdDate: dateToString(post._doc.createdDate),
    author: user.bind(this, post.author),
  };
};

// const transformTrendPosts = async categoryId => {
//   const postAndCategories = await PostAndCategory.find({category: categoryId, type: 'TREND'}).populate('post');
//   return postAndCategories.map(postAndCategory => {
//     return {
//       ...transformPost(postAndCategory.post)
//     }
//   })
// }

// const transformPopularPosts = async categoryId => {
//   const postAndCategories = await PostAndCategory.find({category: categoryId, type: 'POPULAR'}).populate('post');
//   return postAndCategories.map(postAndCategory => {
//     return {
//       ...transformPost(postAndCategory.post)
//     }
//   })
// }

// const transformRatedPosts = async categoryId => {
//   const postAndCategories = await PostAndCategory.find({category: categoryId, type: 'RATED'}).populate('post');
//   return postAndCategories.map(postAndCategory => {
//     return {
//       ...transformPost(postAndCategory.post)
//     }
//   })
// }

// const transformRegularPosts = async categoryId => {
//   const postAndCategories = await PostAndCategory.find({category: categoryId, type: 'REGULAR'}).populate('post');
//   return postAndCategories.map(postAndCategory => {
//     return {
//       ...transformPost(postAndCategory.post)
//     }
//   })
// }

// const transformCategory = category => {
//   return {
//     ...category._doc,
//     _id: category.id,
//     trendPosts: transformTrendPosts.bind(this, category.id),
//     popularPosts: transformPopularPosts.bind(this, category.id),
//     ratedPosts: transformRatedPosts.bind(this, category.id),
//     posts: transformRegularPosts.bind(this, category.id),
//     parentCategory: singleCategory.bind(this, category._doc.parentCategory),
//   }
// }

// const transformPostAndCategory = postAndCategory => {
//   return {
//     ...postAndCategory._doc,
//     category: singleCategory.bind(this, postAndCategory._doc.category),
//     post: () => postLoader.load(postAndCategory._doc.post),
//   }
// }

// const transformNotification = notification => {
//   return {
//     ...notification._doc,
//     _id: notification.id,
//     sendBy: user.bind(this, notification._doc.sendBy),
//     sendTo: user.bind(this, notification._doc.sendTo),
//     createdDate: dateToString(notification._doc.createdDate),
//   }
// }

// const transformComment = comment => {
//   return {
//     ...comment._doc,
//     _id: comment.id,
//     post: singlePost.bind(this, comment.post),
//     createdDate: dateToString(comment._doc.createdDate),
//   }
// }



exports.transformUser = transformUser;
exports.transformTutorial = transformTutorial;
exports.transformCourse = transformCourse;
exports.transformTest = transformTest;
exports.transformPost = transformPost;
exports.transformChat = transformChat;
exports.transformSchedule = transformSchedule;
exports.transformDurem = transformDurem;
exports.transformDuremCategory = transformDuremCategory;
// exports.transform = transform;




// exports.transformPost = transformPost;
// exports.transformComment = transformComment;
// exports.transformCategory = transformCategory;
// exports.transformNotification = transformNotification;
// exports.transformPostAndCategory = transformPostAndCategory;