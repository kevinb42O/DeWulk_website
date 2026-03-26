import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Images to convert (keeping originals as backup)
const imagesToConvert = [
  'final_LOGOSMALL.png',
  'ultiemLOGO.png',
  'garnaalschotel.jpg',
  'garnaalschotel2.jpg',
  'prijslijst.jpg',
  'prijslijst2.jpg',
  'viswinkelV2.jpg',
  'viswinkelV3_BESTE VERSIE.png',
  'winkelV4.png',
  'BijOlienKellyLOGO.png',
  'BijOlienKellyLOGO2WIT.png'
];

async function convertToWebP() {
  console.log('🔄 Starting WebP conversion...\n');
  
  for (const filename of imagesToConvert) {
    const inputPath = path.join(__dirname, filename);
    
    // Check if file exists
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${filename} - file not found`);
      continue;
    }
    
    // Output filename (replace extension with .webp)
    const outputFilename = filename.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const outputPath = path.join(__dirname, outputFilename);
    
    try {
      // Get original file size
      const originalStats = fs.statSync(inputPath);
      const originalSize = (originalStats.size / 1024).toFixed(2);
      
      // Convert to WebP with quality 85 (good balance)
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);
      
      // Get new file size
      const newStats = fs.statSync(outputPath);
      const newSize = (newStats.size / 1024).toFixed(2);
      const savings = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);
      
      console.log(`✅ ${filename} → ${outputFilename}`);
      console.log(`   ${originalSize} KB → ${newSize} KB (${savings}% smaller)\n`);
      
    } catch (error) {
      console.error(`❌ Error converting ${filename}:`, error.message);
    }
  }
  
  console.log('🎉 Conversion complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Update image references in your code');
  console.log('   2. Test the website');
  console.log('   3. Delete old PNG/JPG files if everything works');
}

convertToWebP().catch(console.error);
