import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { mainDb } from "@/utils/firebase/mainClient";

export interface FixtureTournament {
  id?: string;
  name: string;
  gameTitle: string;
  gameType: "bracket" | "points";
  bracketType?: "single" | "double" | "round-robin";
  bestOf?: number;
  prizePool?: string;
  organizer?: string;
  venue?: "online" | "lan";
  teams: string[];
  rounds?: any[];
  pointsTable?: any[];
  placementPoints?: { label: string; pts: number }[];
  killPts?: number;
  killCap?: number;
  wwcdOn?: boolean;
  wwcdBonus?: number;
  createdAt?: any;
  updatedAt?: any;
}

const COLLECTION_NAME = "fixtures";

export async function saveFixture(fixtureData: Omit<FixtureTournament, "id">, id?: string) {
  try {
    const colRef = collection(mainDb, COLLECTION_NAME);
    const docRef = id ? doc(colRef, id) : doc(colRef);
    const payload = {
      ...fixtureData,
      updatedAt: serverTimestamp(),
      ...(id ? {} : { createdAt: serverTimestamp() }),
    };
    await setDoc(docRef, payload, { merge: true });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error("Error saving fixture to Firestore:", error);
    return { success: false, error: error.message };
  }
}

export async function getFixtures(): Promise<FixtureTournament[]> {
  try {
    const colRef = collection(mainDb, COLLECTION_NAME);
    const q = query(colRef, orderBy("updatedAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<FixtureTournament, "id">),
    }));
  } catch (err: any) {
    console.warn("Failed ordered fetch, attempting fallback fetch:", err.message);
    try {
      const colRef = collection(mainDb, COLLECTION_NAME);
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<FixtureTournament, "id">),
      }));
    } catch (fallbackErr) {
      console.error("Failed to fetch fixtures:", fallbackErr);
      return [];
    }
  }
}

export async function getFixtureById(id: string): Promise<FixtureTournament | null> {
  try {
    const docRef = doc(mainDb, COLLECTION_NAME, id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...(snapshot.data() as Omit<FixtureTournament, "id">) };
  } catch (error) {
    console.error("Failed to fetch fixture by id:", error);
    return null;
  }
}

export async function deleteFixture(id: string): Promise<boolean> {
  try {
    const docRef = doc(mainDb, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting fixture:", error);
    return false;
  }
}
