const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');

const filteredObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Do not allow password to update on this route

  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'You are not allowed to update the password on this route!',
        400
      )
    );
  }

  // 2)  filteredOut the unallowed fields like role
  const filteredBody = filteredObj(req.body, 'name', 'email');

  // 3) update the user with findByIdAndUpdate() as we will not need validators b/c that are for pasword
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    return next(new AppError('No user found!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// For Admin for approve or reject
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  const filteredUsers = users.filter((user) => user.role !== 'admin');

  res.status(200).json({
    status: 'success',
    data: {
      users: filteredUsers,
    },
  });
});

// Deleteing means making the active users inactive so that in future if we want we can activate them
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.user.id,
    { active: false },
    {
      new: true,
      runValidators: true,
    }
  );
});
