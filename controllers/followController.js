const followController = {};

const User = require('../models/user');

followController.follow = function () {
  // add current user id to schema (follower) of the profile userController
  //   User.followers.push(newFollower);
  // add profile user id to schema (following) of the current user
};

followController.unfollow = function () {};

// let newFollower = req.user.id;
// let userBeingFollowed = req.params.userId;

// class FollowingProfile {
//   constructor(newFollowerId, userBeingFollowedId) {
//     this.newFollower = newFollowerId;
//     this.userBeingFollowed = userBeingFollowedId;
//   }
//   async follow() {
//     let foundUser = User.updateOne(
//       { _id: this.userBeingFollowed },
//       { $push: { userId: this.newFollower } }
//     );
//     console.log(foundUser);
//   }
// }

// const newFollowerProcess = new FollowingProfile(
//   '5f01e80ad04de70efc7ff5c4',
//   '5eaf07b75abd260c72e08813'
// );
// newFollowerProcess.follow();

module.exports = followController;
