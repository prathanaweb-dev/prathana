const fs = require('fs');
const path = require('path');

const map = JSON.parse(fs.readFileSync('cloudinary_image_map.json', 'utf8'));

// Sort keys by length descending so longer paths match first
const keys = Object.keys(map).sort((a, b) => b.length - a.length);

const targetFiles = [
  'components/Gallery.tsx',
  'components/About.tsx',
  'components/Hero.tsx',
  'components/Stories.tsx',
  'components/GalleryStrip.tsx',
  'components/DonateSupport.tsx',
  'components/CTABanners.tsx',
  'app/[lang]/about/AboutClient.tsx',
  'lib/defaultAboutContent.ts'
];

let totalReplacements = 0;

for (const relFile of targetFiles) {
  const filePath = path.join(__dirname, '..', relFile);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${relFile} (not found)`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let fileReplacements = 0;

  for (const localPath of keys) {
    const cloudUrl = map[localPath];
    if (!cloudUrl) continue;

    // Check raw path
    if (content.includes(localPath)) {
      content = content.split(localPath).join(cloudUrl);
      fileReplacements++;
    }

    // Check encoded path (e.g. %20 for space)
    const encoded = localPath.split('/').map(encodeURIComponent).join('/');
    if (encoded !== localPath && content.includes(encoded)) {
      content = content.split(encoded).join(cloudUrl);
      fileReplacements++;
    }
  }

  if (fileReplacements > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${relFile}: Replaced ${fileReplacements} image URLs with Cloudinary CDN URLs`);
    totalReplacements += fileReplacements;
  } else {
    console.log(`ℹ️ ${relFile}: No local image URLs found to replace`);
  }
}

console.log(`\n🎉 Total replacements: ${totalReplacements}`);
