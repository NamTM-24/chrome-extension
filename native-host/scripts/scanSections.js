const fs = require('fs');
const path = require('path');

function scanSections(projectPath) {
  // get last name path
  const folderName = path.basename(projectPath);

  let sectionsPath;  

  if (folderName === 'sections') {
    sectionsPath = projectPath;  
  }
  else if (folderName === 'app') {
    sectionsPath = path.join(projectPath, 'sections');  
  }
  else {
    sectionsPath = path.join(projectPath, 'app', 'sections');  
  }

  // Check sections folder exists
  if (!fs.existsSync(sectionsPath)) {  
    throw new Error('Sections folder not found at: ' + sectionsPath);
  }

  const items = fs.readdirSync(sectionsPath);  
  const mappings = {};

  items.forEach(item => {
    const itemPath = path.join(sectionsPath, item);  
    const checkDir = fs.statSync(itemPath);  

    // Case 1: is folder, children index.tsx
    if (checkDir.isDirectory()) {
      const indexPath = path.join(itemPath, 'index.tsx');  

      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, 'utf8');
        
        // Find type
        const typeMatch = content.match(/type:\s*["']([^"']+)["']/);
        
        // Find title
        const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
        
        const filePath = path.join(item, 'index.tsx');
        
        // Save type
        if (typeMatch) {
          const type = typeMatch[1];
          mappings[type] = filePath;
        }
        
        // Save title 
        if (titleMatch) {
          const title = titleMatch[1];
          mappings[title] = filePath;
          
          const normalized = title.toLowerCase().replace(/\s+/g, '-');
          mappings[normalized] = filePath;
        }
      }
    }

    // Case 2: file .tsx
    else if (checkDir.isFile() && item.endsWith('.tsx')) {
      const content = fs.readFileSync(itemPath, 'utf8');
      
      // Find type
      const typeMatch = content.match(/type:\s*["']([^"']+)["']/);
      
      // Find title
      const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
      
      // Save type
      if (typeMatch) {
        const type = typeMatch[1];
        mappings[type] = item;
      }
      
      // Save title 
      if (titleMatch) {
        const title = titleMatch[1];
        mappings[title] = item;
        
        const normalized = title.toLowerCase().replace(/\s+/g, '-');
        mappings[normalized] = item;
      }
    }

  });
  
  console.error('Mappings:', mappings);
  return mappings;
}

module.exports = scanSections;