const merge = require("lodash.merge")

module.exports = function() {
	const src = {
		default: {},
		development: {
			siteBaseUrl: "http://localhost:8080"
		},
		production: {
			siteBaseUrl: "https://natebass.github.io/codeforsacramento.org-rework"
		}
	}
	const config = merge({}, src.default);
	process.env.NODE_ENV === "production"
		? merge(config, src.production)
		: merge(config, src.development)
	return config;
}
