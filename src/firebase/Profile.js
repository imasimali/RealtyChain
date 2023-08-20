import { firestore } from "./firebaseConfig";

export const createUser = async (user) => {
  try {
    const userData = {
      name: "New User",
      email: user.email,
      phone: "123-456-7890",
      address: "123 Main Street",
      town: "Sample Town",
      state: "Sample State",
      about: "This is a sample about section.",
    };

    await firestore.collection("users").doc(user.uid).set(userData);
    return "User data successfully created.";
  } catch (error) {
    return console.error("Error creating user data:", error);
  }
};

export const getUserData = async (user) => {
  try {
    const snapshot = await firestore.collection("users").doc(user.uid).get();

    return snapshot.data();
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUserData = async (user, newData) => {
  try {
    const userRef = firestore.collection("users").doc(user.uid);

    await userRef.update(newData);

    return true;
  } catch (error) {
    throw new Error(error);
  }
};
