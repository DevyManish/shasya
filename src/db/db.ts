import { MongoClient, ServerApiVersion } from "mongodb";

export const client = new MongoClient(process.env.MONGODB_URI!, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("App successfully connected to MongoDB!");
  } catch (e: unknown) {
    // Ensures that the client will close when you finish/error
    //await client.close();
    console.log("Connection to MongoDB failed!");
    throw new Error(e instanceof Error ? e.message : String(e));
  }
}
run().catch(console.dir);
