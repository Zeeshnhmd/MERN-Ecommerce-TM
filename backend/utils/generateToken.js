import jwt from 'jsonwebtoken';

import { config } from '../config/config.js';

const generateToken = (res, userId) => {
	const token = jwt.sign({ userId }, config.jwtSecret, {
		expiresIn: '30d',
	});

	// Set JWT as HTTP-only cookie
	res.cookie('jwt', token, {
		httpOnly: true,
		secure: config.env !== 'development',
		sameSite: 'strict',
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
	});
};

export default generateToken;
