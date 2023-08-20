import { firestore } from "../firebaseConfig";

export const getListingsFirebase = async () => {
  try {
    const snapshot = await firestore
      .collection("estate")
      .where("features.status", "==", true)
      .get();

    const data = snapshot.docs.map((doc) => ({
      _id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchListingsFirestore = async (data) => {
  const listings = await firestore
    .collection("estate")
    .get()
    .then((querySnapshot) => {
      const listings = [];
      querySnapshot.forEach((doc) => {
        listings.push({
          _id: doc.id,
          ...doc.data(),
        });
      });
      return listings;
    })
    .catch((error) => {
      console.error("Error fetching listings:", error);
      return [];
    });

  const filteredListings = listings.filter((listing) => {
    const typeMatch =
      data.type === "Property Type" || listing.type === data.type;
    const locationMatch =
      data.location === "Location" || listing.address.city === data.location;
    const areaMatch =
      data.area === "Area (Marla or Kanal)" ||
      listing.address.areatext === data.area;
    const bedsMatch =
      data.beds === "Bed Rooms" || listing.features.beds === data.beds;
    const bathsMatch =
      data.baths === "Bath Rooms" || listing.features.baths === data.baths;
    const descriptionMatch =
      data.searchfield === "" || listing.description.includes(data.searchfield);
    const priceMatch = parseFloat(listing.price) >= parseFloat(data.price);

    return (
      typeMatch &&
      locationMatch &&
      areaMatch &&
      bedsMatch &&
      bathsMatch &&
      descriptionMatch &&
      priceMatch
    );
  });

  return filteredListings;
};

export const updateListing = async (data) => {
  const documentRef = firestore.collection("estate").doc(data.id);

  const update = {
    "owner.metaid": data.owner,
    "owner.name": data.email,
    featured: false,
  };

  try {
    await documentRef.update(update);
    return "Update successful";
  } catch (error) {
    throw new Error(error);
  }
};

export const relistListing = async (data) => {
  const documentRef = firestore.collection("estate").doc(data.id);

  const update = {
    "owner.metaid": data.waddress,
    featured: true,
    price: data.price,
    "features.beds": data.beds,
    "features.baths": data.baths,
    amenities: data.amenities,
  };

  try {
    await documentRef.update(update);
    return "Relist update successful";
  } catch (error) {
    throw new Error(error);
  }
};
