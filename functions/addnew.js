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

const queryDatabase = async (db) => {
  const pokemon = await db
    .collection("estate")
    .find({ "features.status": true })
    .toArray();
  return {
    statusCode: 200,
    body: JSON.stringify(pokemon),
  };
};

const pushToDatabase = async (db, data) => {
  const formData = {
    images: data.images,
    type: data.category,
    price: data.price,
    featured: data.featured,
    date: data.date,
    description: data.description,
    owner: {
      name: data.email,
      metaid: data.waddress,
    },
    address: {
      location: data.location,
      city: data.city,
      state: data.state,
      latitude: data.latitude,
      longitude: data.longitude,
      areatext: data.areatext,
    },
    features: {
      beds: data.beds,
      baths: data.baths,
      areasqft: data.areasqft,
      garage: data.garage,
      pool: data.pool,
      furnished: data.furnished,
      status: data.status,
    },
    amenities: data.amenities,
  };
  if (
    data.images !== "" &&
    data.type !== "" &&
    data.price !== "" &&
    data.date !== "" &&
    data.description !== "" &&
    data.location !== "" &&
    data.city !== "" &&
    data.latitude !== "" &&
    data.longitude !== "" &&
    data.beds !== "" &&
    data.baths !== "" &&
    data.areasqft !== "" &&
    data.areatext !== ""
  ) {
    const res = await db.collection("estate").insertOne(formData);
    return {
      statusCode: 200,
      body: JSON.stringify(res.insertedId),
    };
  }
};

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(MONGODB_URI);

  switch (event.httpMethod) {
    case "GET":
      return await queryDatabase(db);
    case "POST":
      return await pushToDatabase(db, JSON.parse(event.body));
    default:
      return { statusCode: 400 };
  }
};
