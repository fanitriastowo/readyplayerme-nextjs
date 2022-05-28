const dotenv = require("dotenv");
const moduleAlias = require("module-alias");
const fs = require("fs");

const fileList = {};
const styleList = {};
const firebaseLibList = {};

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

try {
  fs.readdirSync("./__mocks__/firebase/").forEach((file) => {
    firebaseLibList[`firebase/${file.replace(".ts", "")}`] =
      __dirname + "/__mocks__/firebase/" + file;
  });
} catch (error) {
  console.warn("Directory `./__mocks__/firebase/` is likely missing");
}

moduleAlias.addAliases(fileList);
moduleAlias.addAliases(firebaseLibList);
moduleAlias.addAlias("@", __dirname);

dotenv.config();
