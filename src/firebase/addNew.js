import { firestore, auth } from "../firebaseConfig";

export const addListingFirebase = async (data) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

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
      const docRef = await firestore.collection("estate").add(formData);
      return docRef.id;
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    throw new Error("Error pushing data");
  }
};
