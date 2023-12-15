const { connectToDb, closeDb } = require("./database-config");
const { getCurrentCollectionName } = require("./utils");
const { getAllResources } = require("./web-scrape-resources");

/**
 * A function that adds resources to the database
 * @param {Object} database representing the database connection/instance
 * @param {Array} resources
 * @returns {void}
 */

async function updateResources(database, resources = []) {
  console.log("---In updateResources---");
  console.log(`Format all resources. Number of resources: ${resources.length}`);
  const formattedResources = resources.map((resource) => ({
    title: resource.title,
    url: resource.url,
    type: resource.type,
    groups: [],
  }));
  console.log(
    `Successfully formatted all resources. Number of resources: ${formattedResources.length}`
  );
  console.log("Run getCurrentCollectionName");
  const collectionName = getCurrentCollectionName();
  await database.collection(collectionName).insertMany(formattedResources);
}

/* Uncomment and run to update to the latest resources */

// let db;
// connectToDb(async (err) => {
//   if (!err) {
//     db = await getDb();
//     getAllResources().then((res) => {
//       updateResources(db, res);
//     });
//   }
// });
