const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const avatarsDir = path.join(__dirname, '../public/avatars');

// Create avatars directory if it doesn't exist
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// Colors for different avatars
const colors = [
  '#FF6B6B', // Coral
  '#4ECDC4', // Turquoise
  '#45B7D1', // Sky Blue
  '#96CEB4', // Sage Green
  '#FFEEAD', // Cream
  '#D4A5A5', // Dusty Rose
];

// Generate 6 avatars
for (let i = 1; i <= 6; i++) {
  const canvas = createCanvas(128, 128);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = colors[i - 1];
  ctx.fillRect(0, 0, 128, 128);

  // Add circle
  ctx.beginPath();
  ctx.arc(64, 64, 40, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  // Add text
  ctx.fillStyle = colors[i - 1];
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(i.toString(), 64, 64);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(avatarsDir, `avatar-${i}.png`), buffer);
}

console.log('Avatar images generated successfully!'); 