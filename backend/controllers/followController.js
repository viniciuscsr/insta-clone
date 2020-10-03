const followController = {};
const FollowUnfollow = require('../models/FollowUnfollow');

followController.follow = function (req, res) {
  const loggedInUser = req.user.id;
  const profileUser = req.params.userId;
  const newFollow = new FollowUnfollow(loggedInUser, profileUser);

  try {
    newFollow.follow();
    res.redirect('back');
  } catch (err) {
    console.log(err);
  }
};

followController.unfollow = function (req, res) {
  const loggedInUser = req.user.id;
  const profileUser = req.params.userId;
  const newUnfollow = new FollowUnfollow(loggedInUser, profileUser);

  try {
    newUnfollow.unfollow();
    res.redirect('back');
  } catch (err) {
    console.log(err);
  }
};

module.exports = followController;
