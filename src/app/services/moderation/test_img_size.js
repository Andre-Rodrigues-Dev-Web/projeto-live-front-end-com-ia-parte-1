const fs = require('fs');
const path = require('path');

const imgPath = path.join(__dirname, '..', '..', '..', 'assets', 'imgs', 'logos', 'logo.png');

try {
  const buf = fs.readFileSync(imgPath);
  // PNG dimensions are at offset 16 (Width) and 20 (Height) of the file
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  console.log(`Image: ${imgPath}`);
  console.log(`Dimensions: ${width}x${height}`);
} catch (e) {
  console.error("Error reading dimensions:", e);
}
