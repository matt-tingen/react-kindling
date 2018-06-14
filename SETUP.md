# Setup Firebase

If you have not yet, install the firebase CLI and tools:

```sh
yarn global add firebase-tools
firebase login
```

Update the `project` in `.firebaserc`.

## Firestore

Enable Firestore and set rules e.g.

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, update, delete: if request.auth.uid == userId;
      allow create: if request.auth.uid != null;
    }
    match /items/{itemId} {
      allow read, update, delete:
        if request.auth.uid == resource.data.userId;
    	allow create: if request.auth.uid != null;
    }
  }
}
```

You may need to set up indices depending on what queries are needed.

## Auth

Enable auth with the Google provider

## Functions

Publish functions:

```sh
cd functions
yarn deploy
```
