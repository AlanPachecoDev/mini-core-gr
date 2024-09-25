
import { db, collection, getDocs  } from "../Models/firebase";

async function getUsers() {
  try {
    // Get all documents from the "Usuarios" collection
    const querySnapshot = await getDocs(collection(db, "Usuarios"));

    // Create an array to store the user data
    const users = [];

    // Iterate over each document and add the data to the array
    querySnapshot.forEach((doc) => {
      // Include the document ID in the user object
      const user = {
        id: doc.id,
        ...doc.data(),
      };
      users.push(user);
    });

    // Return the list of users
    return users;
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
}

async function getSells() {
  try {
    // Get all documents from the "Usuarios" collection
    const querySnapshot = await getDocs(collection(db, "Ventas"));

    // Create an array to store the user data
    const ventas = [];

    // Iterate over each document and add the data to the array
    querySnapshot.forEach((doc) => {
      // Include the document ID in the user object
      const venta = {
        id: doc.id,
        ...doc.data(),
      };
      ventas.push(venta);
    });

    // Return the list of users
    return ventas;
  } catch (error) {
    console.error("Error getting ventas:", error);
    throw error;
  }
}

export { getUsers, getSells };
