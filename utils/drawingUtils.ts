import { Flower, FlowerType, RibbonStyle } from "../types";

// Helper to draw a circle
const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
};

// Helper for petals
const drawPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, rotation: number, color: string) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.ellipse(0, -h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
};

export const drawRose = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
  // Base
  drawCircle(ctx, x, y, size, color);
  
  // Swirls - simulate petals with lighter/darker arcs
  ctx.strokeStyle = 'rgba(0,0,0,0.1)';
  ctx.lineWidth = 2;
  
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(x, y, size * (0.8 - i * 0.2), i, Math.PI + i + 2);
    ctx.stroke();
  }
  
  // Inner spiral highlight
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.beginPath();
  ctx.arc(x - size * 0.2, y - size * 0.2, size * 0.3, 0, Math.PI * 2);
  ctx.fill();
};

export const drawTulip = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
  ctx.fillStyle = color;
  
  // Cup shape
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI, false);
  ctx.lineTo(x - size, y - size); 
  // Top points
  ctx.lineTo(x - size/3, y - size/2);
  ctx.lineTo(x, y - size);
  ctx.lineTo(x + size/3, y - size/2);
  ctx.lineTo(x + size, y - size);
  ctx.closePath();
  ctx.fill();
};

export const drawDaisy = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
  const petalCount = 8;
  const petalSize = size * 0.8;
  
  // Petals
  for (let i = 0; i < petalCount; i++) {
    const angle = (i * Math.PI * 2) / petalCount;
    drawPetal(ctx, x, y, size * 0.6, petalSize * 2.5, angle, color);
  }
  
  // Center
  drawCircle(ctx, x, y, size * 0.5, '#fcd34d'); // Yellow center
};

export const drawSunflower = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
  const petalCount = 12;
  const petalSize = size;
  
  // Petals
  for (let i = 0; i < petalCount; i++) {
    const angle = (i * Math.PI * 2) / petalCount;
    drawPetal(ctx, x, y, size * 0.6, petalSize * 2.5, angle, color);
  }
  
  // Center
  drawCircle(ctx, x, y, size * 0.8, '#78350f'); // Brown center
};

export const drawLavender = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
  // Stalk is drawn separately, this is just the flower part
  // Lavender is a stack of small circles
  for(let i=0; i<5; i++) {
      drawCircle(ctx, x, y - (i * size * 0.8), size * 0.4, color);
      drawCircle(ctx, x + size*0.4, y - (i * size * 0.8) + size*0.4, size * 0.4, color);
      drawCircle(ctx, x - size*0.4, y - (i * size * 0.8) + size*0.4, size * 0.4, color);
  }
};

export const drawLily = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
  const petalCount = 6;
  const petalSize = size * 1.2;
  
  // Petals - Sharper than daisy
  for (let i = 0; i < petalCount; i++) {
    const angle = (i * Math.PI * 2) / petalCount;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(petalSize * 0.4, petalSize * 0.5, 0, petalSize);
    ctx.quadraticCurveTo(-petalSize * 0.4, petalSize * 0.5, 0, 0);
    ctx.fillStyle = color;
    ctx.fill();
    
    // Center line on petal
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, petalSize * 0.7);
    ctx.strokeStyle = "rgba(0,0,0,0.1)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }
  
  // Stamens
  for(let i=0; i<6; i++) {
      const angle = (i * Math.PI * 2) / 6 + (Math.PI/6);
      const dist = size * 0.4;
      drawCircle(ctx, x + Math.cos(angle)*dist, y + Math.sin(angle)*dist, 2, '#713f12');
  }
};

export const drawOrchid = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
  // 3 Sepals (back)
  for(let i=0; i<3; i++) {
     const angle = (i * Math.PI * 2 / 3) - Math.PI/2;
     drawPetal(ctx, x, y, size * 0.5, size * 2, angle, color);
  }
  
  // 2 Petals (front sides)
  drawPetal(ctx, x, y, size * 0.8, size * 1.8, -Math.PI/3, color); // Left
  drawPetal(ctx, x, y, size * 0.8, size * 1.8, Math.PI/3, color); // Right
  
  // Lip (center bottom)
  ctx.save();
  ctx.translate(x, y + size * 0.2);
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.4, size * 0.5, 0, 0, Math.PI*2);
  ctx.fillStyle = '#fce7f3'; // Lighter contrasting color usually, simplified here
  ctx.fill();
  ctx.restore();
};

export const drawCarnation = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
  // Ruffled edges - multiple jagged circles stacked
  const layers = 4;
  for(let i=layers; i>0; i--) {
     const layerSize = size * (i/layers);
     ctx.beginPath();
     // Draw a jagged circle
     const points = 12;
     for(let j=0; j<=points; j++) {
         const angle = (j / points) * Math.PI * 2;
         const r = layerSize + (j % 2 === 0 ? 5 : -5); // Zigzag
         const px = x + Math.cos(angle) * r;
         const py = y + Math.sin(angle) * r;
         if (j===0) ctx.moveTo(px, py);
         else ctx.lineTo(px, py);
     }
     ctx.closePath();
     ctx.fillStyle = color;
     ctx.fill();
     ctx.strokeStyle = "rgba(0,0,0,0.1)";
     ctx.stroke();
  }
};

export const drawHydrangea = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
  // Cluster of small flowers
  const florets = 12;
  const radius = size * 0.8;
  
  // Draw random small florets within the radius
  // We use deterministic positions based on loop to keep it consistent on re-render
  for(let i=0; i<florets; i++) {
     const angle = i * 2.4; // Golden angle-ish
     const dist = Math.min(radius, (i * radius / florets) + 5);
     const fx = x + Math.cos(angle) * dist;
     const fy = y + Math.sin(angle) * dist;
     
     // 4 petals per floret
     for(let j=0; j<4; j++) {
         drawPetal(ctx, fx, fy, size * 0.3, size * 0.3, (j * Math.PI/2), color);
     }
     drawCircle(ctx, fx, fy, 2, '#fff');
  }
};

export const drawPeony = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
   // Large, round, many overlapping petals. Similar to rose but looser cups.
   drawCircle(ctx, x, y, size, color); // Base
   
   // Inner petals as overlapping arcs
   ctx.fillStyle = "rgba(255,255,255,0.1)";
   for(let i=0; i<5; i++) {
       const angle = i * (Math.PI * 2 / 5);
       const px = x + Math.cos(angle) * size * 0.3;
       const py = y + Math.sin(angle) * size * 0.3;
       drawCircle(ctx, px, py, size * 0.6, color);
       
       // Shadow line
       ctx.beginPath();
       ctx.arc(px, py, size * 0.6, 0, Math.PI*2);
       ctx.strokeStyle = "rgba(0,0,0,0.05)";
       ctx.stroke();
   }
   
   // Center
   drawCircle(ctx, x, y, size * 0.2, '#fef08a'); // Yellowish center stamens showing through
};

export const drawPoppy = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    // 4 overlapping large petals
    const petalCount = 4;
    for (let i = 0; i < petalCount; i++) {
        const angle = (i * Math.PI * 2) / petalCount;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.beginPath();
        // Wider petals
        ctx.ellipse(size * 0.4, 0, size * 0.8, size * 0.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }
    // Dark Center
    drawCircle(ctx, x, y, size * 0.3, '#1f2937');
    // Stamen dots
    for(let i=0; i<8; i++) {
        const angle = i * (Math.PI * 2 / 8);
        drawCircle(ctx, x + Math.cos(angle) * size * 0.35, y + Math.sin(angle) * size * 0.35, 3, '#fef08a');
    }
};

export const drawAnemone = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    // 6-8 petals, dark center with white ring
    const petalCount = 7;
    for (let i = 0; i < petalCount; i++) {
        const angle = (i * Math.PI * 2) / petalCount;
        drawPetal(ctx, x, y, size * 0.7, size * 2.2, angle, color);
    }
    
    // Center: Dark button with slight lighter edge
    drawCircle(ctx, x, y, size * 0.35, '#111827');
    drawCircle(ctx, x, y, size * 0.15, '#000000');
};

export const drawCherryBlossom = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    const petalCount = 5;
    for (let i = 0; i < petalCount; i++) {
        const angle = (i * Math.PI * 2) / petalCount;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.beginPath();
        // Notched petal shape
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(size * 0.5, size * 0.2, size * 0.8, size * 0.8); // Side
        ctx.lineTo(size * 0.6, size); // Notch point 1
        ctx.lineTo(size * 0.4, size * 0.8); // Notch dip
        ctx.lineTo(size * 0.2, size); // Notch point 2
        ctx.quadraticCurveTo(-size * 0.5, size * 0.2, 0, 0);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }
    // Stamens
    drawCircle(ctx, x, y, size * 0.15, '#b91c1c'); // Deep red center
};

export const drawRanunculus = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    // Very tight concentric circles/spirals
    drawCircle(ctx, x, y, size, color);
    
    ctx.strokeStyle = "rgba(0,0,0,0.1)";
    ctx.lineWidth = 1;
    
    // Draw multiple overlapping circles to create layers
    for(let i=1; i<8; i++) {
        const r = size * (1 - i * 0.12);
        ctx.beginPath();
        // Slightly wobble the circle
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Highlight
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.beginPath();
    ctx.arc(x - size*0.2, y - size*0.2, size*0.4, 0, Math.PI*2);
    ctx.fill();
};

export const drawDahlia = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    // Geometric pointed petals
    const layers = 3;
    const petalsPerLayer = 12;
    
    for (let l = 0; l < layers; l++) {
        const layerSize = size * (1 - l * 0.25);
        for (let i = 0; i < petalsPerLayer; i++) {
            const angle = (i * Math.PI * 2) / petalsPerLayer + (l * Math.PI / petalsPerLayer); // Offset layers
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            // Diamond/Pointed shape
            ctx.moveTo(0, 0);
            ctx.lineTo(layerSize * 0.3, layerSize * 0.6);
            ctx.lineTo(0, layerSize);
            ctx.lineTo(-layerSize * 0.3, layerSize * 0.6);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
            // Line down middle
            ctx.strokeStyle = "rgba(0,0,0,0.1)";
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(0, layerSize);
            ctx.stroke();
            ctx.restore();
        }
    }
    drawCircle(ctx, x, y, size * 0.1, '#fef9c3');
};

export const drawIris = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    // 3 Upright petals (standards)
    for(let i=0; i<3; i++) {
        const angle = (i * Math.PI * 2 / 3) - Math.PI/2;
        drawPetal(ctx, x, y - size*0.2, size * 0.6, size * 1.5, angle, color);
    }
    // 3 Hanging petals (falls)
    for(let i=0; i<3; i++) {
        const angle = (i * Math.PI * 2 / 3) + Math.PI/6;
        drawPetal(ctx, x, y, size * 0.8, size * 1.8, angle, color);
        // Yellow signal on falls
        const signalX = x + Math.cos(angle) * size * 0.8;
        const signalY = y + Math.sin(angle) * size * 0.8;
        drawCircle(ctx, signalX, signalY, size * 0.15, '#facc15');
    }
};

export const drawGerbera = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    const petalCount = 20;
    const petalSize = size;
    
    // Outer Petals
    for (let i = 0; i < petalCount; i++) {
        const angle = (i * Math.PI * 2) / petalCount;
        drawPetal(ctx, x, y, size * 0.3, petalSize * 2.5, angle, color);
    }
    // Inner Petals (Slightly smaller, offset)
    for (let i = 0; i < petalCount; i++) {
        const angle = (i * Math.PI * 2) / petalCount + (Math.PI/petalCount);
        drawPetal(ctx, x, y, size * 0.25, petalSize * 1.8, angle, color);
    }
    
    // Large Dark Center
    drawCircle(ctx, x, y, size * 0.5, '#451a03'); // Dark brown
    drawCircle(ctx, x, y, size * 0.2, '#000000'); // Black pupil
};

export const drawBabysBreath = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    // A cloud of tiny dots
    const count = 15;
    const spread = size * 1.5;
    
    // Thin stems connecting back to center
    ctx.beginPath();
    for(let i=0; i<count; i++) {
        // Deterministic pseudo-random positions
        const angle = i * 2.4;
        const dist = (i % 3 + 1) * spread * 0.3;
        const px = x + Math.cos(angle) * dist;
        const py = y + Math.sin(angle) * dist - size*0.5;
        
        ctx.moveTo(x, y + size); // Base of cluster
        ctx.lineTo(px, py);
    }
    ctx.strokeStyle = '#a3e635'; // Light green stems
    ctx.lineWidth = 1;
    ctx.stroke();

    // The flowers
    for(let i=0; i<count; i++) {
        const angle = i * 2.4;
        const dist = (i % 3 + 1) * spread * 0.3;
        const px = x + Math.cos(angle) * dist;
        const py = y + Math.sin(angle) * dist - size*0.5;
        
        drawCircle(ctx, px, py, size * 0.15, color);
    }
};

export const drawMarigold = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
  // Dense, ruffled layers like a pom-pom
  const layers = 5;
  for (let i = layers; i > 0; i--) {
    const r = size * (i / layers);
    ctx.beginPath();
    const points = 20; // lots of ruffles
    for (let j = 0; j <= points; j++) {
        const angle = (j / points) * Math.PI * 2;
        // Varying radius creates ruffled edge
        const wobble = (j % 2 === 0 ? 3 : -3) * (i/3); 
        const px = x + Math.cos(angle) * (r + wobble);
        const py = y + Math.sin(angle) * (r + wobble);
        if (j===0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.1)";
    ctx.stroke();
  }
};

export const drawHibiscus = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
  // 5 large broad petals
  const petalCount = 5;
  for (let i = 0; i < petalCount; i++) {
    const angle = (i * Math.PI * 2) / petalCount;
    drawPetal(ctx, x, y, size * 0.9, size * 2.5, angle, color);
  }
  
  // Dark center
  drawCircle(ctx, x, y, size * 0.3, '#7f1d1d');
  
  // Long central stamen
  ctx.save();
  ctx.beginPath();
  // Projecting outwards
  ctx.moveTo(x, y);
  ctx.lineTo(x + size, y - size); 
  ctx.strokeStyle = '#fef08a'; // Pale yellow
  ctx.lineWidth = 3;
  ctx.stroke();
  
  // Stamen Tip (Pistil pads)
  drawCircle(ctx, x + size, y - size, 4, '#fef08a');
  drawCircle(ctx, x + size*0.8, y - size*0.8, 3, '#fef08a');
  ctx.restore();
};

export const drawJasmine = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
   // Star shaped 5-petal flower
   const petalCount = 5;
   for (let i = 0; i < petalCount; i++) {
     const angle = (i * Math.PI * 2) / petalCount;
     ctx.save();
     ctx.translate(x, y);
     ctx.rotate(angle);
     ctx.beginPath();
     // Pointed petal
     ctx.moveTo(0,0);
     ctx.quadraticCurveTo(size*0.3, size*0.5, 0, size*1.5); // Tip
     ctx.quadraticCurveTo(-size*0.3, size*0.5, 0, 0);
     ctx.fillStyle = color;
     ctx.fill();
     ctx.restore();
   }
   // Small yellow center
   drawCircle(ctx, x, y, size * 0.2, '#fefce8');
};


export const drawStem = (ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number, color: string) => {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.quadraticCurveTo(startX, endY - (endY - startY) * 0.5, endX, endY);
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.stroke();
};

export const drawRibbon = (ctx: CanvasRenderingContext2D, x: number, y: number, style: RibbonStyle, color: string) => {
  if (style === RibbonStyle.TWINE) {
     // Rustic Twine Look
     ctx.strokeStyle = '#a16207'; // Brownish/Gold forced for twine texture usually, or mix with color
     if (color !== '#db2777') ctx.strokeStyle = color; // Allow override
     
     ctx.lineWidth = 3;
     for(let i=0; i<5; i++) {
         ctx.beginPath();
         ctx.moveTo(x - 20, y - 10 + i*4);
         ctx.quadraticCurveTo(x, y - 5 + i*4, x + 20, y - 10 + i*4);
         ctx.stroke();
     }
     // Small knot
     drawCircle(ctx, x, y, 8, ctx.strokeStyle as string);
     // Thin hanging ends
     ctx.beginPath();
     ctx.moveTo(x, y);
     ctx.lineTo(x - 10, y + 60);
     ctx.moveTo(x, y);
     ctx.lineTo(x + 15, y + 50);
     ctx.stroke();
     return;
  }

  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  
  // Center Knot
  drawCircle(ctx, x, y, 15, color);

  if (style === RibbonStyle.BOW || style === RibbonStyle.DOUBLE_BOW) {
    // Main Loops
    ctx.beginPath();
    ctx.ellipse(x - 30, y - 10, 30, 15, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + 30, y - 10, 30, 15, 0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  if (style === RibbonStyle.DOUBLE_BOW) {
    // Secondary smaller loops on top
    ctx.beginPath();
    ctx.ellipse(x - 20, y - 25, 20, 10, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + 20, y - 25, 20, 10, 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Streamers
  const length = style === RibbonStyle.LONG ? 200 : 100;
  
  ctx.lineWidth = 10;
  
  if (style === RibbonStyle.CURLY) {
      // Curly streamers
      ctx.beginPath();
      ctx.moveTo(x, y);
      // Zigzag bezier
      ctx.bezierCurveTo(x - 40, y + 30, x + 10, y + 60, x - 30, y + 90);
      ctx.bezierCurveTo(x - 50, y + 110, x - 10, y + 130, x - 35, y + 150);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x + 40, y + 30, x - 10, y + 60, x + 30, y + 90);
      ctx.bezierCurveTo(x + 50, y + 110, x + 10, y + 130, x + 35, y + 150);
      ctx.stroke();
  } else {
      // Standard streamers
      // Left streamer
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x - 30, y + length/2, x - 20, y + length);
      ctx.stroke();
      
      // Right streamer
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + 30, y + length/2, x + 20, y + length);
      ctx.stroke();
  }
};

export const drawWrapper = (ctx: CanvasRenderingContext2D, centerX: number, stemEndY: number, color: string) => {
    // A simple cone wrapper behind the flowers
    ctx.beginPath();
    ctx.moveTo(centerX - 100, stemEndY - 200); // Top Left
    ctx.lineTo(centerX + 100, stemEndY - 200); // Top Right
    ctx.lineTo(centerX, stemEndY + 50); // Bottom tip
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    
    // Front fold
    ctx.beginPath();
    ctx.moveTo(centerX - 100, stemEndY - 200);
    ctx.lineTo(centerX, stemEndY + 50);
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.stroke();
};