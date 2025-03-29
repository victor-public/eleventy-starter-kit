import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

const {
    PATH_PREFIX = ""
} = process.env

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
};

export const config = {
    pathPrefix: PATH_PREFIX || "",
    dir: {
        input: "./src"
    }
}
