const fs = require('fs');
const path = require('path');

const CLOUD_NAME = 'djoklzpse';
const UPLOAD_PRESET = 'prathana_admin';
const DB_PATH = path.join(__dirname, 'lib', 'mock_db.json');

const dirMapping = {
  'awards': 'awards',
  'balgram': 'balgram',
  'naturalfarming': 'farming',
  'Vrudhashram': 'vrudhashram',
  'vanchitanchishala': 'shala',
  'team': 'general'
};

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });
  return arrayOfFiles;
}

async function uploadToCloudinary(filePath) {
  const fileData = fs.readFileSync(filePath);
  const blob = new Blob([fileData]);
  
  const fd = new FormData();
  fd.append('file', blob);
  fd.append('upload_preset', UPLOAD_PRESET);
  fd.append('folder', 'prathana/bulk');

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: fd
  });
  
  const data = await res.json();
  if (!data.secure_url) throw new Error(data.error?.message || 'Upload failed');
  return data.secure_url;
}

async function run() {
  let db = { gallery: [] };
  if (fs.existsSync(DB_PATH)) {
    db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  }
  if (!db.gallery) db.gallery = [];

  const publicDir = path.join(__dirname, 'public');

  for (const [dir, category] of Object.entries(dirMapping)) {
    // We check case-insensitive match for the directory name since Windows is case-insensitive
    // But fs.existsSync is case-sensitive on Linux, let's just construct the exact path
    // Wait, fs is case-insensitive on Windows, so this works.
    const fullPath = path.join(publicDir, dir);
    if (!fs.existsSync(fullPath)) {
      console.log(`Skipping ${dir} - not found`);
      continue;
    }

    console.log(`\nProcessing category: ${category} (from ${dir})`);
    const allFiles = getAllFiles(fullPath);
    const imageFiles = allFiles.filter(f => /\.(png|jpe?g|webp|gif)$/i.test(f));

    for (const filePath of imageFiles) {
      const fileName = path.basename(filePath);
      console.log(`  Uploading ${fileName}...`);
      try {
        const url = await uploadToCloudinary(filePath);
        
        // Add to DB
        const photoEntry = {
          id: 'photo-' + Math.random().toString(36).substring(2, 9),
          url,
          title: fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          category,
          created_at: new Date().toISOString()
        };
        db.gallery.push(photoEntry);
        console.log(`    ✅ Success`);
      } catch (err) {
        console.error(`    ❌ Failed: ${err.message}`);
      }
    }
  }

  // Save DB
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  console.log('\nDone! Updated mock_db.json.');
}

run();
