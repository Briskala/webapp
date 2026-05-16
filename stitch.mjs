import sharp from 'sharp';

async function stitch() {
  try {
    const img1 = await sharp('media/photo_2-1.png').metadata();
    const img2 = await sharp('media/photo_11-1.png').metadata();
    
    console.log('Img1:', img1.width, 'x', img1.height);
    console.log('Img2:', img2.width, 'x', img2.height);

    await sharp({
      create: {
        width: img1.width + img2.width,
        height: Math.max(img1.height, img2.height),
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
    .composite([
      { input: 'media/photo_11-1.png', left: 0, top: 0 },
      { input: 'media/photo_2-1.png', left: img2.width, top: 0 }
    ])
    .toFile('media/photo_combined.png');

    console.log('Successfully stitched to media/photo_combined.png');
  } catch (err) {
    console.error('Error:', err);
  }
}
stitch();
