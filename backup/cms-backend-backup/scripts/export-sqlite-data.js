const Database = require('better-sqlite3');
const fs = require('fs').promises;
const path = require('path');

async function exportSqliteData() {
  console.log('📊 Exporting data from SQLite...\n');
  
  const db = new Database('./prisma/dev.db', { readonly: true });
  
  try {
    const data = {
      users: db.prepare('SELECT * FROM users').all(),
      services: db.prepare('SELECT * FROM services').all(),
      industries: db.prepare('SELECT * FROM industries').all(),
      categories: db.prepare('SELECT * FROM categories').all(),
      caseStudies: db.prepare('SELECT * FROM case_studies').all(),
      newsArticles: db.prepare('SELECT * FROM news_articles').all(),
      caseStudyServices: db.prepare('SELECT * FROM case_study_services').all(),
      mediaFiles: db.prepare('SELECT * FROM media_files').all()
    };
    
    console.log('✅ Data exported:');
    Object.entries(data).forEach(([table, records]) => {
      console.log(`   - ${table}: ${records.length} records`);
    });
    
    // Save to JSON file
    const exportPath = path.join(__dirname, 'sqlite-export.json');
    await fs.writeFile(exportPath, JSON.stringify(data, null, 2));
    console.log(`\n💾 Data saved to: ${exportPath}`);
    
    return data;
  } finally {
    db.close();
  }
}

if (require.main === module) {
  exportSqliteData().catch(console.error);
}

module.exports = { exportSqliteData };