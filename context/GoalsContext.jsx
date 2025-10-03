import { addDoc, collection, onSnapshot, doc as firestoreDoc, deleteDoc, updateDoc} from "firebase/firestore";
import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebaseConfig";

export const GoalsContext = createContext();

export function GoalsProvider({ children }) {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    // ✅ onSnapshot directly gives us unsubscribe function
    const unsubscribe = onSnapshot(collection(db, "goals"), (snapshot) => {
      const goalsData = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setGoals(goalsData);
    });

    return () => unsubscribe(); // ✅ cleanup correctly
  }, []);

  async function createGoal(goalData) {
    try {
      await addDoc(collection(db, "goals"), {
        ...goalData,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  }

  async function deleteGoal(id) {
    try {
      await deleteDoc(firestoreDoc(db, "goals", id));
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  }

  async function updateGoal(id, updatedData) {
    try {
      await updateDoc(firestoreDoc(db, "goals", id), updatedData);
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  }

  return (
    <GoalsContext.Provider
      value={{ goals, createGoal, deleteGoal, updateGoal }}
    >
      {children}
    </GoalsContext.Provider>
  );
}
