/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/',
				destination: '/admin',
				statusCode: 301,
			},
		];
	},
};

module.exports = nextConfig;
