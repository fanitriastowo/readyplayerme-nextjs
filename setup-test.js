const dotenv = require("dotenv");
const moduleAlias = require("module-alias");
const fs = require("fs");

const fileList = {};
const styleList = {};

try {
  fs.readdirSync("./assets/images/").forEach((file) => {
    fileList[`@/assets/images/${file}`] = __dirname + "/__mocks__/index.ts";
  });
} catch (error) {
  console.warn("Directory `./assets/images/` is likely missing");
}

try {
  fs.readdirSync("./styles/").forEach((file) => {
    fileList[`@/styles/${file}`] = __dirname + "/__mocks__/index.ts";
  });
} catch (error) {
  console.warn("Directory `./styles/` is likely missing");
}

moduleAlias.addAliases(fileList);
moduleAlias.addAlias("@", __dirname);

dotenv.config();
