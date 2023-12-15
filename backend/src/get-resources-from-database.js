const { getCurrentCollectionName } = require("./utils");

async function getResourcesFromDB(database) {
  const collectionName = getCurrentCollectionName();
  const resources = [];
  await database
    .collection(collectionName)
    .find({}, { projection: { _id: 0, type: 1, url: 1, title: 1, groups: 1 } })
    .sort({ title: 1 })
    .forEach((resource) => {
      resources.push(resource);
    });
  const allResourcesData = {
    num_of_resources: resources.length,
    data: resources,
  };
  return allResourcesData;
}

module.exports = { getResourcesFromDB };
