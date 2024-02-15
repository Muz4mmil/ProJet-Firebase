import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQ6W2r4s6j7YCUZYV2n-N7qwe391KxKuk",
  authDomain: "projet-8eb48.firebaseapp.com",
  projectId: "projet-8eb48",
  storageBucket: "projet-8eb48.appspot.com",
  messagingSenderId: "512082741127",
  appId: "1:512082741127:web:13ae07108c64f514d4b522",
  measurementId: "G-YYP43GD09N"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);