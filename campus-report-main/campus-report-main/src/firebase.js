// Firebase SDK import
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// !!! 자신의 Firebase 콘솔에서 복사한 설정값으로 변경 !!!
const firebaseConfig = {
  apiKey: "AIzaSyBVMa9e8xfd7I_Qw0mVhtnUq7bMcoG6cDc",
  authDomain: "campus-report.firebaseapp.com",
  projectId: "campus-report",
  storageBucket: "campus-report.appspot.com",
  messagingSenderId: "964941323530",
  appId: "1:964941323530:web:70a1928e8aed2f0343eef3",
  measurementId: "G-SNTKRLL1WF"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스 가져오기
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
