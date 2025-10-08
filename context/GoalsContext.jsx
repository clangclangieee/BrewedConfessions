import { 
  addDoc, 
  collection, 
  onSnapshot, 
  query, 
  where, 
  doc as firestoreDoc, 
  deleteDoc, 
  updateDoc 
} from "firebase/firestore";
import React, { createContext, useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const GoalsContext = createContext();

export function GoalsProvider({ children }) {
  const [goals, setGoals] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      setGoals([]);
      return;
    }

    const goalsRef = collection(db, "goals");
    const q = query(goalsRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const goalsData = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setGoals(goalsData);
    });

    return () => unsubscribe();
  }, [user]);

  async function createGoal(goalData) {
    if (!user) return;

    try {
      await addDoc(collection(db, "goals"), {
        ...goalData,
        userId: user.uid,
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
    <GoalsContext.Provider value={{ goals, createGoal, deleteGoal, updateGoal }}>
      {children}
    </GoalsContext.Provider>
  );
}
