const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, getDocs, writeBatch } = require('firebase/firestore');

const CLOUD_NAME = 'djoklzpse';
const UPLOAD_PRESET = 'prathana_admin';

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

const dirMapping = {
  'balgram': { category: 'balgram', titleEn: 'Balgram Campus', titleMr: 'बालग्राम परिसर', descEn: 'Children and life at Prathana Balgram campus in Morvanchi.', descMr: 'मोरवंची येथील प्रार्थना बालग्राममधील मुले आणि दैनंदिन जीवन.' },
  'naturalfarming': { category: 'farming', titleEn: 'Natural Farming', titleMr: 'नैसर्गिक शेती', descEn: 'Chemical-free, organic farming practiced on the campus.', descMr: 'कॅम्पसवर केली जाणारी सेंद्रिय व विषमुक्त नैसर्गिक शेती.' },
  'Vrudhashram': { category: 'vrudhashram', titleEn: 'Old Age Home', titleMr: 'प्रार्थना वृद्धाश्रम', descEn: 'Loving care and dignified shelter for abandoned elderly residents.', descMr: 'निराधार आणि वृद्ध व्यक्तींसाठी सन्मानाचा निवारा आणि आपुलकीची काळजी.' },
  'vanchitanchishala': { category: 'shala', titleEn: 'Vanchitanchi Shala', titleMr: 'वंचितांची शाळा', descEn: 'Informal learning and awareness classes for underprivileged street children.', descMr: 'वंचित व रस्त्यावरील मुलांसाठी अनौपचारिक शिक्षण आणि जागरूकता वर्ग.' },
  'awards': { category: 'awards', titleEn: 'Recognition & Awards', titleMr: 'पुरस्कार व सन्मान', descEn: 'Felicitations and honours received for humanitarian work.', descMr: 'मानवतावादी व सामाजिक कार्यासाठी मिळालेले सन्मान व पुरस्कार.' },
  'team': { category: 'team', titleEn: 'Team & Volunteers', titleMr: 'कार्यकर्ते व टीम', descEn: 'Dedicated leadership and frontline team members.', descMr: 'संस्थेचे संस्थापक, विश्वस्त आणि समर्पित कार्यकर्ते.' }
};

function getAllFiles(dirPath, arrayOfFiles) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles || [];
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    const full = path.join(dirPath, file);
    if (fs.statSync(full).isDirectory()) {
      arrayOfFiles = getAllFiles(full, arrayOfFiles);
    } else {
      arrayOfFiles.push(full);
    }
  });
  return arrayOfFiles;
}

async function uploadToCloudinary(filePath, category) {
  const fileData = fs.readFileSync(filePath);
  const blob = new Blob([fileData]);
  
  const fd = new FormData();
  fd.append('file', blob);
  fd.append('upload_preset', UPLOAD_PRESET);
  fd.append('folder', `prathana/${category}`);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: fd
  });
  
  const data = await res.json();
  if (!data.secure_url) {
    throw new Error(data.error?.message || JSON.stringify(data));
  }
  return data.secure_url;
}

async function main() {
  console.log('🚀 Starting Cloudinary bulk upload...');
  const publicDir = path.join(__dirname, '..', 'public');
  const mapFile = path.join(__dirname, '..', 'cloudinary_image_map.json');

  let imageMap = {};
  if (fs.existsSync(mapFile)) {
    try {
      imageMap = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
    } catch {}
  }

  const galleryList = [];
  const entriesToUpload = [];

  for (const [dirKey, config] of Object.entries(dirMapping)) {
    const dirPath = path.join(publicDir, dirKey);
    const files = getAllFiles(dirPath).filter(f => /\.(jpe?g|png|webp|gif|JPG|JPEG|PNG)$/i.test(f));
    
    console.log(`Found ${files.length} images in ${dirKey}`);
    for (const filePath of files) {
      // Relative path from public directory (standard web path)
      const relPath = '/' + path.relative(publicDir, filePath).replace(/\\/g, '/');
      const encodedRelPath = '/' + path.relative(publicDir, filePath).replace(/\\/g, '/').split('/').map(encodeURIComponent).join('/');
      entriesToUpload.push({ filePath, relPath, encodedRelPath, config, dirKey });
    }
  }

  console.log(`\nTotal images to process: ${entriesToUpload.length}`);

  // Upload in parallel batches of 5
  const BATCH_SIZE = 5;
  for (let i = 0; i < entriesToUpload.length; i += BATCH_SIZE) {
    const batch = entriesToUpload.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async (item) => {
      const fileName = path.basename(item.filePath);
      
      // Check if already uploaded
      if (imageMap[item.relPath]) {
        console.log(`[Already Uploaded] ${item.relPath} -> ${imageMap[item.relPath]}`);
        galleryList.push({
          id: 'photo-' + Buffer.from(item.relPath).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 12),
          url: imageMap[item.relPath],
          title: item.config.titleEn,
          title_mr: item.config.titleMr,
          desc: item.config.descEn,
          desc_mr: item.config.descMr,
          category: item.config.category,
          created_at: new Date().toISOString(),
          local_path: item.relPath
        });
        return;
      }

      try {
        console.log(`Uploading (${i+1}/${entriesToUpload.length}): ${fileName}...`);
        const secureUrl = await uploadToCloudinary(item.filePath, item.config.category);
        imageMap[item.relPath] = secureUrl;
        imageMap[item.encodedRelPath] = secureUrl;
        
        galleryList.push({
          id: 'photo-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36),
          url: secureUrl,
          title: item.config.titleEn,
          title_mr: item.config.titleMr,
          desc: item.config.descEn,
          desc_mr: item.config.descMr,
          category: item.config.category,
          created_at: new Date().toISOString(),
          local_path: item.relPath
        });
        console.log(`  ✅ Success: ${secureUrl}`);
      } catch (err) {
        console.error(`  ❌ Failed ${fileName}: ${err.message}`);
      }
    }));

    // Save map incrementally
    fs.writeFileSync(mapFile, JSON.stringify(imageMap, null, 2), 'utf8');
  }

  console.log(`\n🎉 Uploaded ${Object.keys(imageMap).length} images to Cloudinary!`);

  // Now seed Firebase Firestore gallery collection
  console.log('\n🔥 Seeding Firebase Firestore "gallery" collection...');
  try {
    const existingSnap = await getDocs(collection(firestore, 'gallery'));
    console.log(`Existing Firestore gallery photos count: ${existingSnap.docs.length}`);
    
    // Upload in batches of 200 to firestore
    for (const photo of galleryList) {
      const docRef = doc(firestore, 'gallery', photo.id);
      await setDoc(docRef, photo, { merge: true });
    }
    console.log(`✅ Successfully seeded ${galleryList.length} photos into Firestore!`);
  } catch (err) {
    console.error(`⚠️ Firestore seeding warning: ${err.message}`);
  }

  // Update mock_db.json
  const mockDbPath = path.join(__dirname, '..', 'lib', 'mock_db.json');
  if (fs.existsSync(mockDbPath)) {
    try {
      const db = JSON.parse(fs.readFileSync(mockDbPath, 'utf8'));
      db.gallery = galleryList;
      fs.writeFileSync(mockDbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Updated mock_db.json with new Cloudinary gallery photos.');
    } catch (e) {
      console.error('Failed to update mock_db.json:', e);
    }
  }

  console.log('\n✨ All done!');
  process.exit(0);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
