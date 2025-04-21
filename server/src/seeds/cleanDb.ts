import models from "../models/index.js";
import db from "../config/connection.js";

export default async (modelName: "Question", collectionName: string) => {
  try {
    const model = models[modelName];
    const database = model?.db?.db;

    if (!database) {
      throw new Error(
        `Database instance for model "${modelName}" is undefined.`
      );
    }

    const modelExists = await database
      .listCollections({ name: collectionName })
      .toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    console.error("Error in cleanDb:", err);
    throw err;
  }
};
