# Firestore Security Rules (paste in Firebase Console):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
     // Users collection
     match /users/{userId} {
       allow read: if request.auth != null;
       allow create: if request.auth != null && request.auth.uid == userId;
       allow update: if request.auth != null && request.auth.uid == userId;
     }

     // Elections collection - readable by everyone
     match /elections/{electionId} {
       allow read: if true;
       allow create: if request.auth != null;
       allow update: if request.auth != null;
     }

     // Candidates collection - readable by everyone
     match /candidates/{candidateId} {
       allow read: if true;
       allow create: if request.auth != null;
       allow update: if request.auth != null;
       allow delete: if request.auth != null;
     }

     // Votes collection
     match /votes/{voteId} {
       allow read: if request.auth != null;
       allow create: if request.auth != null
         && request.resource.data.voterId == request.auth.uid;
     }

    match /meta/{docId} {
      allow read: if true; 
      allow write: if request.auth != null; // Allows the bootstrap script to finish
    }
  }
}
```