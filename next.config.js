/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/',
				destination: '/login',
				statusCode: 301,
			},
		];
	},
};

module.exports = nextConfig;
