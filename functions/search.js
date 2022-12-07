const MongoClient = require("mongodb").MongoClient;
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
    type: data.type,
    location: data.location,
    area: data.area,
    beds: data.beds,
    baths: data.baths,
    description: data.searchfield,
    price: data.price,
  };

  query.type == "Property Type" ? (query.type = { $exists: true }) : query.type;
  query.location == "Location"
    ? (query.location = { $exists: true })
    : query.location;
  query.area == "Area (Marla or Kanal)"
    ? (query.area = { $exists: true })
    : query.area;
  query.beds == "Bed Rooms" ? (query.beds = { $exists: true }) : query.beds;
  query.baths == "Bath Rooms" ? (query.baths = { $exists: true }) : query.baths;
  query.description == ""
    ? (query.description = { $exists: true })
    : query.description;
  query.price == "0" ? (query.price = "0.001") : query.price;

  console.log(query);

  const pokemon = await db
    .collection("estate")
    .find({
      $and: [
        { type: query.type },
        { "address.city": query.location },
        { "address.areatext": query.area },
        { "features.beds": query.beds },
        { "features.baths": query.baths },
        { description: query.description },
        { price: { $gte: query.price } },
      ],
    })
    .toArray();
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
