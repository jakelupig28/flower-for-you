import React, { useRef, useEffect, useState } from 'react';
import { BouquetState, Flower, FlowerType } from '../types';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants';
import { 
  drawRose, drawTulip, drawDaisy, drawSunflower, drawLavender, 
  drawLily, drawOrchid, drawCarnation, drawHydrangea, drawPeony,
  drawPoppy, drawAnemone, drawCherryBlossom, drawRanunculus, drawDahlia,
  drawIris, drawGerbera, drawBabysBreath, drawMarigold, drawHibiscus, drawJasmine,
  drawStem, drawRibbon, drawWrapper 
} from '../utils/drawingUtils';

interface BouquetCanvasProps {
  state: BouquetState;
  onFlowerSelect: (id: string | null) => void;
  onFlowerMove: (id: string, x: number, y: number) => void;
  selectedFlowerId: string | null;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const BouquetCanvas: React.FC<BouquetCanvasProps> = ({ state, onFlowerSelect, onFlowerMove, selectedFlowerId, canvasRef }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.fillStyle = state.backgroundColor;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const stemConvergeX = CANVAS_WIDTH / 2;
    const stemConvergeY = CANVAS_HEIGHT - 200;

    // Draw Wrapper (Background Layer)
    if (state.hasWrapper) {
       drawWrapper(ctx, stemConvergeX, stemConvergeY, state.wrapperColor);
    }

    // Draw Stems first (so they are behind flowers)
    state.flowers.forEach(flower => {
        // Simple perspective: flowers higher up have stems starting higher
        drawStem(ctx, flower.x, flower.y + 10, stemConvergeX, stemConvergeY, flower.stemColor);
    });

    // Draw Flowers (sorted by Y mostly, but simplified here)
    // We sort by Y so lower flowers appear "in front" if overlapping vertically
    const sortedFlowers = [...state.flowers].sort((a, b) => a.y - b.y);

    sortedFlowers.forEach(flower => {
      const isSelected = flower.id === selectedFlowerId;
      
      // Highlight selection
      if (isSelected) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(flower.x, flower.y, flower.scale * 25, 0, Math.PI * 2);
        ctx.shadowColor = "rgba(0,0,0,0.2)";
        ctx.shadowBlur = 15;
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.fill();
        ctx.restore();
      }

      switch (flower.type) {
        case FlowerType.ROSE:
          drawRose(ctx, flower.x, flower.y, flower.scale * 20, flower.color);
          break;
        case FlowerType.TULIP:
          drawTulip(ctx, flower.x, flower.y, flower.scale * 20, flower.color);
          break;
        case FlowerType.DAISY:
          drawDaisy(ctx, flower.x, flower.y, flower.scale * 20, flower.color);
          break;
        case FlowerType.SUNFLOWER:
          drawSunflower(ctx, flower.x, flower.y, flower.scale * 25, flower.color);
          break;
        case FlowerType.LAVENDER:
          drawLavender(ctx, flower.x, flower.y, flower.scale * 20, flower.color);
          break;
        case FlowerType.LILY:
          drawLily(ctx, flower.x, flower.y, flower.scale * 20, flower.color);
          break;
        case FlowerType.ORCHID:
          drawOrchid(ctx, flower.x, flower.y, flower.scale * 20, flower.color);
          break;
        case FlowerType.CARNATION:
          drawCarnation(ctx, flower.x, flower.y, flower.scale * 20, flower.color);
          break;
        case FlowerType.HYDRANGEA:
          drawHydrangea(ctx, flower.x, flower.y, flower.scale * 25, flower.color);
          break;
        case FlowerType.PEONY:
          drawPeony(ctx, flower.x, flower.y, flower.scale * 22, flower.color);
          break;
        case FlowerType.POPPY:
          drawPoppy(ctx, flower.x, flower.y, flower.scale * 22, flower.color);
          break;
        case FlowerType.ANEMONE:
          drawAnemone(ctx, flower.x, flower.y, flower.scale * 22, flower.color);
          break;
        case FlowerType.CHERRY_BLOSSOM:
          drawCherryBlossom(ctx, flower.x, flower.y, flower.scale * 18, flower.color);
          break;
        case FlowerType.RANUNCULUS:
          drawRanunculus(ctx, flower.x, flower.y, flower.scale * 21, flower.color);
          break;
        case FlowerType.DAHLIA:
          drawDahlia(ctx, flower.x, flower.y, flower.scale * 24, flower.color);
          break;
        case FlowerType.IRIS:
          drawIris(ctx, flower.x, flower.y, flower.scale * 22, flower.color);
          break;
        case FlowerType.GERBERA:
          drawGerbera(ctx, flower.x, flower.y, flower.scale * 24, flower.color);
          break;
        case FlowerType.BABYS_BREATH:
          drawBabysBreath(ctx, flower.x, flower.y, flower.scale * 20, flower.color);
          break;
        case FlowerType.MARIGOLD:
          drawMarigold(ctx, flower.x, flower.y, flower.scale * 22, flower.color);
          break;
        case FlowerType.HIBISCUS:
          drawHibiscus(ctx, flower.x, flower.y, flower.scale * 24, flower.color);
          break;
        case FlowerType.JASMINE:
          drawJasmine(ctx, flower.x, flower.y, flower.scale * 20, flower.color);
          break;
      }
    });

    // Draw Ribbon (Front Layer)
    drawRibbon(ctx, stemConvergeX, stemConvergeY, state.ribbonStyle, state.ribbonColor);

    // Draw Watermark (Bottom Right)
    ctx.save();
    ctx.font = '24px "Pacifico", cursive'; // Changed font to Pacifico
    ctx.fillStyle = '#f9a8d4'; // Light pink (pink-300) to match theme better
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('flower for you', CANVAS_WIDTH - 20, CANVAS_HEIGHT - 20);
    ctx.restore();

  }, [state, selectedFlowerId]);

  // Mouse Handlers
  const getMousePos = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const { x, y } = getMousePos(e);
    // Hit detection (reverse order to pick top-most)
    const clickedFlower = [...state.flowers].reverse().find(f => {
      const dist = Math.sqrt(Math.pow(f.x - x, 2) + Math.pow(f.y - y, 2));
      return dist < (f.scale * 25); // Approximate hit radius
    });

    if (clickedFlower) {
      onFlowerSelect(clickedFlower.id);
      setIsDragging(true);
      setDragOffset({ x: x - clickedFlower.x, y: y - clickedFlower.y });
    } else {
      onFlowerSelect(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedFlowerId) {
      const { x, y } = getMousePos(e);
      onFlowerMove(selectedFlowerId, x - dragOffset.x, y - dragOffset.y);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative shadow-xl rounded-xl overflow-hidden border-4 border-white bg-white">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="w-full h-auto cursor-pointer touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};

export default BouquetCanvas;