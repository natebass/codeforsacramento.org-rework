module.exports = {
	plugins: {
		tailwindcss: {},
		autoprefixer: {},
		"postcss-import": {},
		"postcss-preset-env": {
			stage: 2,
			features: {
				"nesting-rules": true,
				"custom-media-queries": true,
				"custom-selectors": true,
				"logical-properties-and-values": true,
				"lab-function": true
			}
		}
	}
}
