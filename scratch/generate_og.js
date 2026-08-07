import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateOGImage() {
  const inputPath = path.resolve(__dirname, '../public/assets/ayush-kushwaha-logo.webp');
  const outputPath = path.resolve(__dirname, '../public/assets/og-image.webp');

  try {
    console.log('Generating padded OG Image...');

    // Resize the logo to fit nicely within a 1200x630 box.
    // Let's resize it to a maximum of 600x600 so it leaves plenty of padding, ensuring it doesn't get cropped when squares are generated.
    const resizedLogo = await sharp(inputPath)
      .resize({
        width: 500,
        height: 500,
        fit: 'inside', // maintain aspect ratio, fit inside the dimensions
      })
      .toBuffer();

    // Create a 1200x630 background (dark #000 or near black, let's use #0a0a0a to match a dark theme).
    // Or we can use #ffffff (white) depending on the logo color. 
    // The logo from the screenshot looks like black text/shapes on a transparent or white background. Wait, the screenshot shows the logo on a white square. Let's make the background white.
    await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 } // Solid white background
      }
    })
      .composite([
        {
          input: resizedLogo,
          gravity: 'center'
        }
      ])
      .webp({ quality: 90 })
      .toFile(outputPath);

    console.log('Successfully generated og-image.webp!');
  } catch (err) {
    console.error('Error generating image:', err);
  }
}

generateOGImage();
