/*
=========================================================
* Material Kit 2 React - v2.1.0
========================================================
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseConfig from "layouts/utils/FireBase";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDocuments() {
  try {
    const querySnapshot = await getDocs(collection(db, "candidates"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  } catch (error) {
    console.error("Erro ao obter documentos: ", error);
  }
}

export default getDocuments;
