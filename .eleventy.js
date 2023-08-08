const collections = require("./eleventy/collections");
const collectionFilters = require("./eleventy/filters/collections");
const urlFilters = require("./eleventy/filters/urls");
const dateFilters = require("./eleventy/filters/dates");
const shortcodes = require("./eleventy/shortcodes");
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const eleventyimg = require("@11ty/eleventy-img")

module.exports = function(config) {
	config.addPlugin(rssPlugin);
	config.addPlugin(syntaxHighlight);
	const Image = eleventyimg;
	async function imageShortcode(src, alt, extraAttrs, sizes = "100vw") {
		if (alt === undefined) {
			// You bet we throw an error on missing alt (alt="" works okay)
			throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
		}
		let metadata = await Image(src, {
			widths: [600, null],
			formats: ["avif", "webp", "jpeg"],
			urlPath: "/assets/img/",
			outputDir: "./dist/assets/img/"
		});
		let highsrc = metadata.jpeg[metadata.jpeg.length - 1];
		return `<picture>
    ${Object.values(metadata)
		.map(imageFormat => {
			return `  <source type="${
				imageFormat[0].sourceType
			}" srcset="${imageFormat
				.map(entry => entry.srcset)
				.join(", ")}" sizes="${sizes}">`;
		})
		.join("\n")}
      <img
        src="${highsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        loading="lazy"
        decoding="async"
		${extraAttrs}
		>
    </picture>`;
	}
	config.addShortcode("getUrl", shortcodes.postUrl);
	config.addShortcode("getOwnerInfo", shortcodes.getOwnerInfo);
	config.addShortcode("getPostType", shortcodes.getPostType);
	config.addShortcode("isOldPost", shortcodes.isOldPost);
	config.addLiquidShortcode("image", imageShortcode);
	config.addFilter("friendlyDate", dateFilters.friendlyDate);
	config.addFilter("dateToIso8601", dateFilters.dateToIso8601);
	config.addFilter("byTag", collectionFilters.byTag);
	config.addFilter("absoluteUrl", urlFilters.absoluteUrl);
	config.addFilter("htmlToAbsoluteUrls", rssPlugin.convertHtmlToAbsoluteUrls);
	config.addFilter("dateToRfc3339", rssPlugin.dateToRfc3339);
	config.addFilter(
		"getNewestCollectionItemDate",
		rssPlugin.getNewestCollectionItemDate
	);
	config.addCollection("primary", collections.primary);
	config.addPassthroughCopy({ "src/assets/font": "assets/font" });
	return {
		pathPrefix: "/", // useful for GitHub pages
		dir: {
			input: "./",
			output: "dist",
			includes: "src/includes",
			layouts: "src/layouts",
			data: "src/data"
		}
	};
};
