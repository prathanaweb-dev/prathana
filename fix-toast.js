const fs = require('fs');
let file = 'app/admin/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/showToast\('Failed to load page content', 'error'\);/g, 'setToast({msg: "Failed to load page content", type: "error"}); setTimeout(() => setToast(null), 4000);');
content = content.replace(/showToast\('Error loading page content', 'error'\);/g, 'setToast({msg: "Error loading page content", type: "error"}); setTimeout(() => setToast(null), 4000);');
content = content.replace(/showToast\('Page content saved successfully!', 'success'\);/g, 'setToast({msg: "Page content saved successfully!", type: "success"}); setTimeout(() => setToast(null), 4000);');
content = content.replace(/showToast\('Error saving page content', 'error'\);/g, 'setToast({msg: "Error saving page content", type: "error"}); setTimeout(() => setToast(null), 4000);');

const toastStr = "  const [toast, setToast] = useState<{msg:string; type:'success'|'error'} | null>(null);";
content = content.replace(toastStr, ''); 
content = content.replace('// Page Content Editor states', toastStr + '\n\n  // Page Content Editor states');

fs.writeFileSync(file, content);
