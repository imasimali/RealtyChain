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
    throw new Error("Error querying data");
  }
};
