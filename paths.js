const path = require("path");

// Src
const projectSrcDir = path.resolve(__dirname, ".");
const assetSrcDir = path.resolve(__dirname, "_assets");
// Dist
const projectDestDir = path.resolve(__dirname, "dist");
const assetDestDir = `${projectDestDir}/assets`;

const paths = {
	html: {
		src: `${projectDestDir}/**/*.html`,
		dest: projectDestDir
	},
	img: {
		src: `${assetSrcDir}/images/**/*.{png,jpg,jpeg,svg}`,
		dest: `${assetDestDir}/images`
	},
	css: {
		src: `${assetSrcDir}/css`,
		dest: `${assetDestDir}/css`,
		name: "style.css",
		additionalWatch: [`${projectSrcDir}/tailwind.config.js`],
		purge: {
			content: [`${projectDestDir}/**/*.html`]
		}
	},
	font: {
		src: `${assetSrcDir}/font/**/*`,
		dest: `${assetDestDir}/font`
	},
	projectDestDir: projectDestDir
};

export { paths };