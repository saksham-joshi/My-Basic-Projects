#!/usr/bin/env bun

import { initializeApp, type FirebaseOptions } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";

type RuntimeEnv = Record<string, string | undefined>;

const processEnv = (globalThis as { process?: { env?: RuntimeEnv } }).process
  ?.env;
const bunEnv = (globalThis as { Bun?: { env?: RuntimeEnv } }).Bun?.env;

const readEnv = (key: string): string =>
  (processEnv?.[key] ?? bunEnv?.[key] ?? "").trim();

const requiredKeys = [
  "BUN_PUBLIC_FIREBASE_API_KEY",
  "BUN_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "BUN_PUBLIC_FIREBASE_PROJECT_ID",
  "BUN_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "BUN_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "BUN_PUBLIC_FIREBASE_APP_ID",
] as const;

const missingKeys = requiredKeys.filter((key) => !readEnv(key));

if (missingKeys.length > 0) {
  console.error(
    `❌ Missing Firebase environment variables: ${missingKeys.join(", ")}`
  );
  process.exit(1);
}

const firebaseConfig: FirebaseOptions = {
  apiKey: readEnv("BUN_PUBLIC_FIREBASE_API_KEY"),
  authDomain: readEnv("BUN_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: readEnv("BUN_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: readEnv("BUN_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: readEnv("BUN_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: readEnv("BUN_PUBLIC_FIREBASE_APP_ID"),
};

const adminAadhar =
  readEnv("SEED_ADMIN_AADHAR").replace(/\s/g, "") || "999999999999";
const adminPassword = readEnv("SEED_ADMIN_PASSWORD") || "admin123456";
const adminName = readEnv("SEED_ADMIN_NAME") || "Election Officer";
const adminPlace = (readEnv("SEED_ADMIN_PLACE") || "india").toLowerCase();
const adminEmail = `${adminAadhar}@admin.votingsystem.in`;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function ensureAdminUser(): Promise<string> {
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      adminEmail,
      adminPassword
    );
    console.log(`✅ Admin auth account created: ${adminEmail}`);
    return userCred.user.uid;
  } catch (error: any) {
    if (error?.code === "auth/email-already-in-use") {
      const signedIn = await signInWithEmailAndPassword(
        auth,
        adminEmail,
        adminPassword
      );
      console.log(`ℹ️ Admin auth account already exists: ${adminEmail}`);
      return signedIn.user.uid;
    }

    if (error?.code === "auth/configuration-not-found") {
      throw new Error(
        "Firebase Authentication is not configured. Enable Authentication and turn on Email/Password provider in Firebase Console."
      );
    }

    throw error;
  }
}

async function ensureAdminProfile(uid: string) {
  await setDoc(
    doc(db, "users", uid),
    {
      uid,
      role: "admin",
      name: adminName,
      aadharCard: adminAadhar,
      place: adminPlace,
      createdAt: Date.now(),
    },
    { merge: true }
  );

  console.log("✅ Admin profile document ensured in users collection.");
}

async function ensureSampleElection(adminUid: string): Promise<string> {
  const existingElectionSnap = await getDocs(
    query(collection(db, "elections"), limit(1))
  );

  if (!existingElectionSnap.empty) {
    const existing = existingElectionSnap.docs[0];
    console.log(`ℹ️ Elections already exist. Keeping existing data (${existing.id}).`);
    return existing.id;
  }

  const now = Date.now();
  const startTime = now + 24 * 60 * 60 * 1000;
  const endTime = startTime + 8 * 60 * 60 * 1000;
  const electionRef = doc(collection(db, "elections"));

  await setDoc(electionRef, {
    title: "Sample Municipal Election",
    position: "Mayor",
    place: adminPlace,
    startTime,
    endTime,
    status: "upcoming",
    createdBy: adminUid,
    createdAt: now,
  });

  console.log(`✅ Sample election created: ${electionRef.id}`);
  return electionRef.id;
}

async function ensureSampleCandidate(electionId: string) {
  const existingCandidateSnap = await getDocs(
    query(
      collection(db, "candidates"),
      where("electionId", "==", electionId),
      limit(1)
    )
  );

  if (!existingCandidateSnap.empty) {
    console.log("ℹ️ Candidate data already exists for sample election.");
    return;
  }

  const candidateRef = doc(collection(db, "candidates"));
  await setDoc(candidateRef, {
    electionId,
    userId: "seed-candidate-001",
    name: "Sample Candidate",
    aadharCard: "111122223333",
    panCard: "ABCDE1234F",
    voterId: "VOTER0001",
    party: "Independent",
    status: "approved",
    voteCount: 0,
    appliedAt: Date.now(),
  });

  console.log(`✅ Sample candidate created: ${candidateRef.id}`);
}

async function ensureMetaDocument() {
  await setDoc(
    doc(db, "meta", "bootstrap"),
    {
      version: 1,
      initializedAt: Date.now(),
      notes: "Initial bootstrap document for Online Voting System",
    },
    { merge: true }
  );

  console.log("✅ Meta bootstrap document created.");
}

async function bootstrap() {
  console.log("\n🚀 Starting Firestore bootstrap...\n");

  const adminUid = await ensureAdminUser();
  await ensureAdminProfile(adminUid);

  const electionId = await ensureSampleElection(adminUid);
  await ensureSampleCandidate(electionId);
  await ensureMetaDocument();

  console.log("\n🎉 Firestore bootstrap complete.");
  console.log(`Admin login ID: ${adminAadhar} (role: admin)`);
  console.log(`Admin password: ${adminPassword}`);
}

bootstrap().catch((error) => {
  console.error("\n❌ Firestore bootstrap failed.");
  console.error(error);
  process.exit(1);
});
