import dotenv from 'dotenv';

dotenv.config();

const _config = {
	/* eslint-disable */
	port: process.env.PORT,
	env: process.env.NODE_ENV,
};

export const config = Object.freeze(_config);
