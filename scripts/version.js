#!/usr/bin/env node

"use strict";

const fs = require("fs");

/**
 * @param  {string} dir
 * @return {void}
 * @method
 * @private
 */
const execute = () =>
{
    const indexPath = `${process.cwd()}/src/index.ts`;
    if (fs.existsSync(indexPath)) {

        const src = fs.readFileSync(indexPath, "utf8");
        const packageJson = require(`${process.cwd()}/package.json`);

        const texts = src.split("\n");
        for (let idx = 0; idx < texts.length; ++idx) {

            const text = texts[idx];
            if (text.indexOf("Next2D Framework") === -1) {
                continue;
            }

            const top   = texts.slice(0, idx).join("\n");
            const lower = texts.slice(idx + 1).join("\n");

            fs.writeFileSync(
                indexPath,
                `${top}
console.log("%c Next2D Framework %c ${packageJson.version} %c https://next2d.app",
${lower}`
            );

            break;
        }
    }
};

execute();