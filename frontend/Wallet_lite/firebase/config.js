// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA3k_jzxkvwgyjdkWQUb58-vG5Wjqd8YXc",
//   authDomain: "wallet-lite.firebaseapp.com",
//   projectId: "wallet-lite",
//   storageBucket: "wallet-lite.firebasestorage.app",
//   messagingSenderId: "735287656148",
//   appId: "1:735287656148:web:95c31e5a2164e5de6b4541",
//   measurementId: "G-95LZSBVK1T"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// export const auth = getAuth(app);
// export const db = getFirestore(app);





import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3k_jzxkvwgyjdkWQUb58-vG5Wjqd8YXc",
  authDomain: "wallet-lite.firebaseapp.com",
  projectId: "wallet-lite",
  storageBucket: "wallet-lite.firebasestorage.app",
  messagingSenderId: "735287656148",
  appId: "1:735287656148:web:95c31e5a2164e5de6b4541",
};

// ✅ Firebase App (UNE seule fois)
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

// ✅ Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export { app };
