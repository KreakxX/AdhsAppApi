import admin from "firebase-admin";

import serviceAccount from "../google-services.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      serviceAccount as admin.ServiceAccount
    ),
  });
}

export const fcm = admin.messaging();
