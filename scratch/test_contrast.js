const sharp = require('sharp');

async function test() {
  const trimmed = await sharp('scratch/trimmed_remote_logo.png')
    .resize({ height: 60 }) // 60px height in header
    .png()
    .toBuffer();

  // Create a dark background banner to test contrast
  const bg = await sharp({
    create: {
      width: 400,
      height: 80,
      channels: 4,
      background: { r: 15, g: 15, b: 18, alpha: 1 }
    }
  }).composite([{ input: trimmed, top: 10, left: 20 }])
  .png()
  .toFile('scratch/test_header_contrast.png');

  console.log('Generated test_header_contrast.png');
}

test();
