import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * @desc    Auth User
 * @route   POST /api/users/login
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id);

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('Invalid email or password');
	}
});

/**
 * @desc    Register User
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExist = await User.findOne({ email });

	if (userExist) {
		res.status(400);
		throw new Error('User already exist');
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		generateToken(res, user._id);

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('Invalid email or password');
	}
});

/**
 * @desc    Logout User / clear cookie
 * @route   POST /api/users/logout
 * @access  Private
 */
const logoutUser = asyncHandler(async (req, res) => {
	res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
	res.status(200).json({ message: 'Logout successfully' });
});

/**
 * @desc    Get User Profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

/**
 * @desc    Update User Profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.status(200).json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

/**
 * @desc    Get Users
 * @route   GET /api/users
 * @access  Private/admin
 */
const getUsers = asyncHandler(async (req, res) => {
	res.send('Get Users Profile');
});

/**
 * @desc    Get Users
 * @route   GET /api/users/:id
 * @access  Private/admin
 */
const getUserById = asyncHandler(async (req, res) => {
	res.send('Get Users by ID');
});

/**
 * @desc    Delete Users
 * @route   DELETE /api/users/:id
 * @access  Private/admin
 */
const deleteUser = asyncHandler(async (req, res) => {
	res.send('Delete User Profile');
});

/**
 * @desc    Update User
 * @route   PUT /api/users/:id
 * @access  Private/admin
 */
const updateUser = asyncHandler(async (req, res) => {
	res.send('Update User Profile');
});

export {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	getUserById,
	deleteUser,
	updateUser,
};
