import dotenv from 'dotenv';

dotenv.config();

const _config = {
	/* eslint-disable */
	port: process.env.PORT,
	env: process.env.NODE_ENV,
	mongoURI: process.env.MONGO_URI,
	jwtSecret: process.env.JWT_SECRET,
};

export const config = Object.freeze(_config);
