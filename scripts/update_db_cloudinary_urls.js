const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, getDocs } = require('firebase/firestore');

const map = JSON.parse(fs.readFileSync('cloudinary_image_map.json', 'utf8'));
const keys = Object.keys(map).sort((a, b) => b.length - a.length);

function replaceUrlsInString(str) {
  if (typeof str !== 'string') return str;
  let res = str;
  for (const k of keys) {
    if (res.includes(k)) {
      res = res.split(k).join(map[k]);
    }
  }
  return res;
}

function replaceUrlsInObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map(item => replaceUrlsInObject(item));
  }
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string') {
      result[k] = replaceUrlsInString(v);
    } else if (typeof v === 'object') {
      result[k] = replaceUrlsInObject(v);
    } else {
      result[k] = v;
    }
  }
  return result;
}

// 1. Update mock_db.json
const mockDbPath = path.join(__dirname, '..', 'lib', 'mock_db.json');
if (fs.existsSync(mockDbPath)) {
  let db = JSON.parse(fs.readFileSync(mockDbPath, 'utf8'));
  db = replaceUrlsInObject(db);
  fs.writeFileSync(mockDbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log('✅ Updated mock_db.json with Cloudinary image URLs');
}

// 2. Update Firestore documents for campaigns, projects, events, team_members
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

const collectionsToUpdate = ['campaigns', 'projects', 'events', 'team_members', 'activities'];

async function updateFirestoreCollections() {
  for (const colName of collectionsToUpdate) {
    try {
      const snap = await getDocs(collection(firestore, colName));
      console.log(`Checking collection ${colName} (${snap.docs.length} docs)...`);
      for (const d of snap.docs) {
        const data = d.data();
        const updated = replaceUrlsInObject(data);
        if (JSON.stringify(data) !== JSON.stringify(updated)) {
          await setDoc(doc(firestore, colName, d.id), updated);
          console.log(`  ✅ Updated doc ${d.id} in ${colName}`);
        }
      }
    } catch (e) {
      console.error(`Error updating ${colName}:`, e.message);
    }
  }
  console.log('🎉 Firestore update completed!');
  process.exit(0);
}

updateFirestoreCollections();
