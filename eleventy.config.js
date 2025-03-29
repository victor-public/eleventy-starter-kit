import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

import fs from "fs"
import path from "path"
import cssnano from "cssnano"
import postcss from "postcss"
import tailwindcss from "@tailwindcss/postcss"

const {
    PATH_PREFIX = ""
} = process.env

const processor = postcss([
    //compile tailwind
    tailwindcss(),

    //minify tailwind css
    cssnano({
        preset: "default"
    }),
])


export default function (eleventyConfig) {
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

    eleventyConfig.on("eleventy.before", async () => {
        const tailwindInputPath = path.resolve("./src/assets/styles/index.css")

        const tailwindOutputPath = "./_site/assets/styles/index.css"

        const cssContent = fs.readFileSync(tailwindInputPath, "utf8")

        const outputDir = path.dirname(tailwindOutputPath)
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true })
        }

        const result = await processor.process(cssContent, {
            from: tailwindInputPath,
            to: tailwindOutputPath,
        })

        fs.writeFileSync(tailwindOutputPath, result.css)
    })
}

export const config = {
    pathPrefix: PATH_PREFIX || "",
    dir: {
        input: "./src"
    }
}
