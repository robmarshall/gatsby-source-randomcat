const chalk = require("chalk");
const axios = require("axios");

const {
  flattenArray,
  getCurrentTimestamp,
  isArray,
  isObject,
  isObjEmpty
} = require("./utils/helpers");

// Set the current active enviroment
let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

// If we are in dev, ignore the fact that we may be using a fake SSL certificate
if (activeEnv == "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const log = console.log;

exports.sourceNodes = async (
  { actions: { createNode }, createContentDigest, createNodeId },
  { api }
) => {
  log(chalk.black.bgWhite("Starting Random Cat Source plugin"));

  if (!api) {
    log(
      chalk.bgRed("You seem to be missing API details in your gatsby-config.js")
    );
    return;
  }

  let result;

  try {
    result = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=10${
        catCategories ? "?category_ids=" + catCategories : ""
      }`,
      {
        responseType: "json",
        headers: { "x-api-key": api }
      }
    );
  } catch (err) {
    log(chalk.bgRed("There was an error"));
    log(err);
  }

  return result;
};
