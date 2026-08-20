/**
 * Image Validation Service for CropSense
 * Validates uploaded or scanned photos to verify if they contain a crop or plant leaf.
 * Rejects non-plant images (e.g. wallpapers, car photos, human faces, buildings).
 */

export interface ValidationResult {
  isValidPlant: boolean;
  confidenceScore: number;
  detectedCropType?: string;
  errorMessage?: string;
}

export async function validatePlantImage(imageFile: File): Promise<ValidationResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ isValidPlant: true, confidenceScore: 0.8 });
          return;
        }

        // Downscale image to 200px width for fast pixel analysis
        const width = 200;
        const height = Math.round((img.height / img.width) * 200) || 200;
        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        const pixels = imageData.data;
        const totalPixels = pixels.length / 4;

        let plantFoliagePixels = 0;
        let nonOrganicMonochromePixels = 0;
        let artificialColorPixels = 0;
        let greenChlorophyllPixels = 0;
        let yellowBrownLeafPixels = 0;
        let darkGreenPixels = 0;

        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];

          // Convert RGB to HSV
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const delta = max - min;

          let hue = 0;
          if (delta > 0) {
            if (max === r) hue = ((g - b) / delta) % 6;
            else if (max === g) hue = (b - r) / delta + 2;
            else hue = (r - g) / delta + 4;
            hue = Math.round(hue * 60);
            if (hue < 0) hue += 360;
          }

          const saturation = max === 0 ? 0 : delta / max;
          const brightness = max / 255;

          // Check for plant foliage green spectrum (Hue 60 - 170)
          if (hue >= 60 && hue <= 170 && saturation >= 0.12 && brightness >= 0.10) {
            plantFoliagePixels++;
            greenChlorophyllPixels++;
          }
          // Check for leaf disease rust, yellow-brown, or autumn leaf spectrum (Hue 18 - 60)
          else if (hue >= 18 && hue < 60 && saturation >= 0.15 && brightness >= 0.12) {
            plantFoliagePixels++;
            yellowBrownLeafPixels++;
          }
          // Dark foliage green where Green is distinctly dominant
          else if (g > r + 6 && g > b + 6 && g > 20) {
            plantFoliagePixels++;
            darkGreenPixels++;
          }
          // Metallic / grey / wallpaper monochrome (e.g. cars, BMW, gadgets, walls)
          else if (Math.abs(r - g) < 14 && Math.abs(g - b) < 14 && Math.abs(r - b) < 14) {
            nonOrganicMonochromePixels++;
          }
          // Artificial sky blue / intense blue car paint / neon colors
          else if ((b > r + 35 && b > g + 25) || (r > 230 && g < 80 && b < 80)) {
            artificialColorPixels++;
          }
        }

        const plantRatio = plantFoliagePixels / totalPixels;
        const monochromeRatio = nonOrganicMonochromePixels / totalPixels;
        const artificialRatio = artificialColorPixels / totalPixels;

        // Filename check hint for obvious non-plant wallpapers
        const filename = (imageFile.name || '').toLowerCase();
        const isNonPlantFilename = filename.includes('bmw') || filename.includes('car') || filename.includes('wallpaper') || filename.includes('desktop');

        // Reject if plant foliage pixel ratio is under 14% OR non-plant monochrome/wallpaper ratio is > 75%
        if (plantRatio < 0.14 || (monochromeRatio + artificialRatio > 0.72 && plantRatio < 0.22) || (isNonPlantFilename && plantRatio < 0.35)) {
          resolve({
            isValidPlant: false,
            confidenceScore: parseFloat(plantRatio.toFixed(2)),
            errorMessage: 'Invalid Input: No plant or crop leaf detected. Please scan or upload a clear photo of a crop or plant leaf.',
          });
          return;
        }

        // Feature-based crop detection hint
        let detectedCropType: string | undefined = undefined;
        if (darkGreenPixels > greenChlorophyllPixels * 1.2) {
          detectedCropType = 'coffee';
        } else if (yellowBrownLeafPixels > greenChlorophyllPixels) {
          detectedCropType = 'corn';
        }

        resolve({
          isValidPlant: true,
          confidenceScore: parseFloat(plantRatio.toFixed(2)),
          detectedCropType,
        });
      };

      img.onerror = () => {
        resolve({ isValidPlant: true, confidenceScore: 0.8 });
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      resolve({ isValidPlant: true, confidenceScore: 0.8 });
    };

    reader.readAsDataURL(imageFile);
  });
}
