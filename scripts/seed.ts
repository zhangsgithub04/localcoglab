import { MongoClient } from "mongodb";
import { labs } from "../lib/labs";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "coglab_catalog";

if (!uri) {
  throw new Error("Set MONGODB_URI before running npm run seed.");
}

const client = new MongoClient(uri);

async function main() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("labs");

  await collection.deleteMany({});
  await collection.insertMany(labs);
  await collection.createIndex({ slug: 1 }, { unique: true });
  await collection.createIndex({ category: 1, order: 1 });

  console.log(`Seeded ${labs.length} labs into ${dbName}.labs`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await client.close();
  });
