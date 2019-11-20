const axios = require("axios");
const chalk = require("chalk");
const log = console.log;

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

exports.sourceNodes = async (
  { actions: { createNode }, createContentDigest, createNodeId },
  { api, limit }
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
      `https://api.thecatapi.com/v1/images/search?limit=${limit ? limit : "5"}`,
      {
        responseType: "json",
        headers: { "x-api-key": api }
      }
    );
  } catch (err) {
    log(chalk.bgRed("There was an error"));
    log(err);
  }

  if (result.data) {
    for (const [key, value] of Object.entries(result.data)) {
      let catObj = result.data[key];
      // Add the Gatsby internal information.
      // contentDigest tracks any changes and lets Gatsby know if
      // the data needs to be rerendered, or is everything is
      // the same.

      console.log(catObj);

      let newCatNode = {
        // This is needed for Gatsby to track the node
        // https://www.gatsbyjs.org/docs/node-api-helpers/#createNodeId
        id: createNodeId(`random-cat-${catObj.id.toString()}`),
        internal: {
          // All nodes need a unique nodetype. It is used by GraphQL so users
          // can query for nodes based on their type.
          type: "Random__Cat",
          // The contentDigest is a hashed string made from the returned object
          // If the content changes, then the hash changes. Informing Gatsby
          // it needs to recreate the node with new data.
          // https://www.gatsbyjs.org/docs/node-api-helpers/#createContentDigest
          contentDigest: createContentDigest(catObj)
        },
        // Here we add our cat data to the node
        catId: parseInt(catObj.id),
        url: catObj.url,
        width: catObj.width,
        height: catObj.height,
        breeds: catObj.breeds
      };

      // Finally we pass the new cat object to createNode, to add the data to GraphQL
      // https://www.gatsbyjs.org/docs/actions/#createNode
      createNode(newCatNode);
    }
  }

  return result;
};
