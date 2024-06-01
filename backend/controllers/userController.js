import jwt from 'jsonwebtoken';

import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import { config } from '../config/config.js';

/**
 * @desc    Auth User
 * @route   POST /api/users/login
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
			expiresIn: '30d',
		});

		// Set JWT as HTTP-only cookie
		res.cookie('jwt', token, {
			httpOnly: true,
			secure: config.env !== 'development',
			sameSite: 'strict',
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		});

		res.json({
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
	res.send('Register User');
});

/**
 * @desc    Logout User / clear cookie
 * @route   POST /api/users/logout
 * @access  Private
 */
const logoutUser = asyncHandler(async (req, res) => {
	res.send('Logout User');
});

/**
 * @desc    Get User Profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
	res.send('Get User Profile');
});

/**
 * @desc    Update User Profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
	res.send('Update User Profile');
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
