const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const MONGODB_URI = process.env.MONGO_URI;

let cachedDb = null;

const connectToDatabase = async (uri) => {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 1,
    maxIdleTimeMS: 5000,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 10000,
  });

  cachedDb = client.db("emadfyp");

  return cachedDb;
};

const pushToDatabase = async (db, data) => {
  const query = {
    id: data.id,
    owner: data.waddress,
    price: data.price,
    beds: data.beds,
    baths: data.baths,
    amenities: data.amenities,
  };
  console.log("Relist Update Query", query);
  const update = {
    "owner.metaid": query.owner,
    featured: true,
    price: query.price,
    "features.beds": query.beds,
    "features.baths": query.baths,
    amenities: query.amenities,
  };
  const pokemon = await db
    .collection("estate")
    .updateOne({ _id: ObjectID(query.id) }, { $set: update });
  return {
    statusCode: 200,
    body: JSON.stringify(pokemon),
  };
};

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const db = await connectToDatabase(MONGODB_URI);

  switch (event.httpMethod) {
    case "POST":
      return await pushToDatabase(db, JSON.parse(event.body));
    default:
      return { statusCode: 400 };
  }
};
