const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.approveUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  user.active = true;

  await user.save();

  res.status(200).json({
    status: 'success',
    message: `${user.name} has been approved!`,
  });
});

exports.rejectUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  user.active = false;

  await user.save();

  res.status(200).json({
    status: 'success',
    message: `${user.name} has been rejected!`,
  });
});
