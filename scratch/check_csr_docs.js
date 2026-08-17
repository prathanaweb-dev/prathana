const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBRGkXIYLqvT7x7l5ZtWwrQLlt3poIGGxY",
  authDomain: "prathanango.firebaseapp.com",
  projectId: "prathanango",
  storageBucket: "prathanango.firebasestorage.app",
  messagingSenderId: "72978337792",
  appId: "1:72978337792:web:0b04fc2725cd2fda7808e5"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

async function checkCsrDocs() {
  const snap = await getDocs(collection(firestore, 'csr_documents'));
  console.log('CSR Docs in Firestore count:', snap.docs.length);
  snap.docs.forEach(d => {
    console.log(d.id, d.data());
  });
  process.exit(0);
}

checkCsrDocs();
