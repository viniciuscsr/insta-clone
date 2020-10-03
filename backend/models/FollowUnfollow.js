const User = require('./user.js');

class FollowUnfollow {
  constructor(loggedInUser, profileUser) {
    this.loggedInUser = loggedInUser;
    this.profileUser = profileUser;
  }
  async follow() {
    let foundFollowedUser;
    let foundFollowingUser;
    try {
      // checking if user is trying to follow himself
      if (this.profileUser == this.loggedInUser) {
        return console.log('You can not follow yourself');
      }
      // adding user id into the follower field of the profile user
      foundFollowedUser = await User.findById(this.profileUser);
      // checking if user id already exists in the array
      for (let i = 0; i < foundFollowedUser.followers.length; i++) {
        if (foundFollowedUser.followers[i] == this.loggedInUser) {
          return console.log('You already are a follower of this profile');
        }
      }
      foundFollowedUser.followers.push(this.loggedInUser);
      await foundFollowedUser.save();
      // adding user id into the following field of the logged in user
      foundFollowingUser = await User.findById(this.loggedInUser);
      // checking if user id already exists in the array
      for (let i = 0; i < foundFollowingUser.following.length; i++) {
        if (foundFollowingUser.following[i] == this.profileUser) {
          return console.log('This user is already on your following list');
        }
      }
      foundFollowingUser.following.push(this.profileUser);
      await foundFollowingUser.save();
    } catch (err) {
      console.log(err);
    }
  }

  async unfollow() {
    let foundUnfollowedUser;
    let foundUnfollowingUser;
    try {
      // checking if user is trying to unfollow himself
      if (this.profileUser == this.loggedInUser) {
        return console.log('You can not unfollow yourself');
      }
      // removing user id from the follower field of the profile user
      foundUnfollowedUser = await User.findById(this.profileUser);
      foundUnfollowedUser.followers.pull(this.loggedInUser);
      await foundUnfollowedUser.save();
      // removing user id from the following field of the logged in user
      foundUnfollowingUser = await User.findById(this.loggedInUser);
      foundUnfollowingUser.following.pull(this.profileUser);
      await foundUnfollowingUser.save();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = FollowUnfollow;
