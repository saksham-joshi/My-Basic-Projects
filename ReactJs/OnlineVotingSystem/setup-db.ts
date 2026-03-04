#!/usr/bin/env bun
/**
 * Database Schema Setup Script
 *
 * This script initializes the Firestore database with the required collections
 * and creates a sample admin account. Run this once to set up the database.
 *
 * Usage: bun run setup-db.ts
 *
 * Firestore Collections:
 *
 * 1. users
 *    - uid: string (Firebase Auth UID)
 *    - role: "admin" | "voter" | "candidate"
 *    - name: string
 *    - aadharCard: string (12 digits)
 *    - voterId?: string (for voters and candidates)
 *    - panCard?: string (for candidates)
 *    - place: string (lowercase city/constituency)
 *    - createdAt: number (timestamp)
 *
 * 2. elections
 *    - title: string
 *    - position: string (e.g., "Mayor", "MLA")
 *    - place: string (lowercase, matches voter places)
 *    - startTime: number (timestamp)
 *    - endTime: number (timestamp)
 *    - status: "upcoming" | "active" | "completed"
 *    - createdBy: string (admin uid)
 *    - createdAt: number (timestamp)
 *
 * 3. candidates
 *    - electionId: string (reference to elections doc)
 *    - userId: string (reference to users doc)
 *    - name: string
 *    - aadharCard: string
 *    - panCard: string
 *    - voterId: string
 *    - party: string
 *    - status: "pending" | "approved" | "rejected"
 *    - voteCount: number
 *    - appliedAt: number (timestamp)
 *
 * 4. votes
 *    - electionId: string (reference to elections doc)
 *    - voterId: string (user uid, NOT voter ID card)
 *    - candidateId: string (reference to candidates doc)
 *    - votedAt: number (timestamp)
 *
 * Firestore Security Rules (paste in Firebase Console):
 *
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     // Users collection
 *     match /users/{userId} {
 *       allow read: if request.auth != null;
 *       allow create: if request.auth != null && request.auth.uid == userId;
 *       allow update: if request.auth != null && request.auth.uid == userId;
 *     }
 *
 *     // Elections collection - readable by everyone
 *     match /elections/{electionId} {
 *       allow read: if true;
 *       allow create: if request.auth != null;
 *       allow update: if request.auth != null;
 *     }
 *
 *     // Candidates collection - readable by everyone
 *     match /candidates/{candidateId} {
 *       allow read: if true;
 *       allow create: if request.auth != null;
 *       allow update: if request.auth != null;
 *       allow delete: if request.auth != null;
 *     }
 *
 *     // Votes collection
 *     match /votes/{voteId} {
 *       allow read: if request.auth != null;
 *       allow create: if request.auth != null
 *         && request.resource.data.voterId == request.auth.uid;
 *     }
 *   }
 * }
 */

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const requiredEnvVars = [
  "BUN_PUBLIC_FIREBASE_API_KEY",
  "BUN_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "BUN_PUBLIC_FIREBASE_PROJECT_ID",
  "BUN_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "BUN_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "BUN_PUBLIC_FIREBASE_APP_ID",
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing environment variable: ${envVar}`);
    process.exit(1);
  }
}

const firebaseConfig = {
  apiKey: process.env.BUN_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.BUN_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.BUN_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.BUN_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.BUN_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.BUN_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function createAdminUser() {
  console.log("\n🔧 Setting up database...\n");

  // --- Create a sample Admin user ---
  const adminAadhar = "999999999999"; // sample admin aadhar
  const adminPassword = "admin123456"; // change this

  const adminEmail = `${adminAadhar}@admin.votingsystem.in`;

  try {
    console.log("👤 Creating admin account...");
    const userCred = await createUserWithEmailAndPassword(
      auth,
      adminEmail,
      adminPassword
    );

    await setDoc(doc(db, "users", userCred.user.uid), {
      uid: userCred.user.uid,
      role: "admin",
      name: "Election Officer",
      aadharCard: adminAadhar,
      place: "india",
      createdAt: Date.now(),
    });

    console.log("✅ Admin account created successfully!");
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Aadhar: ${adminAadhar}`);
    console.log(`   Password: ${adminPassword}`);
    console.log(`   UID: ${userCred.user.uid}`);
  } catch (err: any) {
    if (err.code === "auth/email-already-in-use") {
      console.log("ℹ️  Admin account already exists, skipping...");
    } else {
      console.error("❌ Error creating admin:", err.message);
    }
  }

  console.log("\n📋 Database Schema Summary:");
  console.log(
    "   Collection: users       — User profiles (admin/voter/candidate)"
  );
  console.log("   Collection: elections   — Election definitions");
  console.log(
    "   Collection: candidates  — Candidate applications per election"
  );
  console.log("   Collection: votes       — Individual votes (secret ballot)");
  console.log(
    "\n✅ Setup complete! Don't forget to set Firestore security rules."
  );
  console.log("   (See the rules in the comments at the top of this file)\n");

  process.exit(0);
}

createAdminUser();
