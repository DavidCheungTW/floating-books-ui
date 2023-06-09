import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKi-yhPsC1yAbUtnj_alC4QQxsLNFdoxg",
  authDomain: "floatingbooks-829a8.firebaseapp.com",
  projectId: "floatingbooks-829a8",
  storageBucket: "floatingbooks-829a8.appspot.com",
  messagingSenderId: "521113816385",
  appId: "1:521113816385:web:fdb199a56deece4d1965c0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
