var config = {
	local: {
		mode: 'local',
		port: 3000,
		mongo: {
			host: '127.0.0.1',
			port: 27017
		}
	},
	staging: {
		mode: 'staging',
		port: 4000,
		mongo: {
			host: '127.0.0.1',
			port: 27017
		}
	},
	production: {
		mode: 'production',
		port: 5000,
		mongo: {
			host: '127.0.0.1',
			port: 27017
		}
	}
};

module.exports = config[process.argv[2]] || config.local;
