import React, { useState, useRef, useCallback, useEffect } from 'react';
import BouquetCanvas from './components/BouquetCanvas';
import Controls from './components/Controls';
import AIModal from './components/AIModal';
import { BouquetState, Flower, FlowerType, RibbonStyle } from './types';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';
import { generateBouquetRecipe } from './services/geminiService';
import { Download, Flower as FlowerIcon, ArrowRight, ChevronLeft } from 'lucide-react';

const INITIAL_STATE: BouquetState = {
  flowers: [],
  ribbonColor: '#db2777',
  ribbonStyle: RibbonStyle.BOW,
  wrapperColor: '#fce7f3',
  hasWrapper: true,
  backgroundColor: '#ffffff'
};

const GardenBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-sky-200">
      {/* Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-pink-100 opacity-90" />

      {/* Sun */}
      <div className="absolute top-8 right-16 w-32 h-32 bg-yellow-300 rounded-full shadow-[0_0_60px_rgba(253,224,71,0.8)] animate-pulse" />

      {/* Clouds - Layer 1 (Slow) */}
      <div className="absolute top-20 left-[5%] opacity-90 animate-in slide-in-from-left duration-[60s] ease-linear repeat-infinite">
         <div className="w-32 h-12 bg-white rounded-full relative shadow-sm">
            <div className="absolute -top-6 left-6 w-14 h-14 bg-white rounded-full" />
            <div className="absolute -top-8 left-14 w-16 h-16 bg-white rounded-full" />
         </div>
      </div>
      
      {/* Clouds - Layer 2 (Medium) */}
      <div className="absolute top-32 right-[15%] opacity-80 animate-in slide-in-from-left duration-[45s] ease-linear repeat-infinite" style={{ animationDelay: '-15s' }}>
         <div className="w-40 h-14 bg-white rounded-full relative shadow-sm">
            <div className="absolute -top-6 left-6 w-16 h-16 bg-white rounded-full" />
            <div className="absolute -top-10 left-16 w-20 h-20 bg-white rounded-full" />
         </div>
      </div>

      {/* Clouds - Layer 3 (Fast/Small) */}
      <div className="absolute top-10 left-[40%] opacity-70 animate-in slide-in-from-left duration-[35s] ease-linear repeat-infinite" style={{ animationDelay: '-5s' }}>
         <div className="w-24 h-8 bg-white/90 rounded-full relative">
            <div className="absolute -top-4 left-4 w-10 h-10 bg-white/90 rounded-full" />
         </div>
      </div>

      {/* Far Hills */}
      <div className="absolute bottom-0 left-[-20%] right-[-20%] h-[55%] bg-emerald-200 rounded-[100%] translate-y-24" />
      <div className="absolute bottom-0 right-[-10%] left-[-10%] h-[45%] bg-emerald-300 rounded-[100%] translate-y-16" />

      {/* Tree (Left Background) */}
      <div className="absolute bottom-[40%] left-[10%] opacity-90">
         <div className="w-6 h-24 bg-amber-800 mx-auto rounded-sm" />
         <div className="absolute -top-16 -left-12 w-32 h-32 bg-green-500 rounded-full shadow-inner opacity-90" />
         <div className="absolute -top-20 -left-8 w-28 h-28 bg-green-400 rounded-full shadow-sm" />
         <div className="absolute -top-12 -right-8 w-24 h-24 bg-green-500 rounded-full shadow-inner" />
      </div>

      {/* House */}
      <div className="absolute bottom-[35%] left-[55%] -translate-x-1/2 scale-75 md:scale-100">
         {/* Chimney */}
         <div className="absolute -top-16 right-4 w-8 h-16 bg-red-800 border-2 border-red-900" />
         <div className="absolute -top-20 right-4 w-10 h-4 bg-red-900 rounded-sm" />
         
         {/* Smoke */}
         <div className="absolute -top-24 right-6 w-4 h-4 bg-gray-200 rounded-full animate-bounce opacity-70" style={{ animationDuration: '3s' }} />
         <div className="absolute -top-32 right-4 w-6 h-6 bg-gray-200 rounded-full animate-bounce opacity-50" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />

         {/* Roof */}
         <div className="w-0 h-0 border-l-[100px] border-r-[100px] border-b-[80px] border-l-transparent border-r-transparent border-b-red-500 relative z-10 drop-shadow-md" />
         
         {/* Main Body */}
         <div className="w-40 h-32 bg-amber-50 mx-auto relative shadow-lg border-2 border-amber-100 flex justify-center items-end pb-0">
             {/* Door */}
             <div className="w-12 h-20 bg-amber-800 rounded-t-full border-4 border-amber-900 relative">
                <div className="absolute top-10 right-2 w-2 h-2 bg-yellow-400 rounded-full shadow-sm" />
             </div>
             
             {/* Windows */}
             <div className="absolute top-6 left-4 w-10 h-10 bg-sky-200 border-4 border-amber-200 rounded-lg overflow-hidden">
                <div className="w-full h-1 bg-amber-200 absolute top-1/2 -translate-y-1/2" />
                <div className="h-full w-1 bg-amber-200 absolute left-1/2 -translate-x-1/2" />
             </div>
             <div className="absolute top-6 right-4 w-10 h-10 bg-sky-200 border-4 border-amber-200 rounded-lg overflow-hidden">
                <div className="w-full h-1 bg-amber-200 absolute top-1/2 -translate-y-1/2" />
                <div className="h-full w-1 bg-amber-200 absolute left-1/2 -translate-x-1/2" />
             </div>
             
             {/* Bushes */}
             <div className="absolute -bottom-2 -left-6 w-12 h-12 bg-green-500 rounded-full border-b-4 border-green-700" />
             <div className="absolute -bottom-2 -right-6 w-12 h-12 bg-green-500 rounded-full border-b-4 border-green-700" />
         </div>
      </div>

      {/* Tree (Right Background) */}
      <div className="absolute bottom-[38%] right-[15%] opacity-90 scale-90">
         <div className="w-8 h-28 bg-amber-800 mx-auto rounded-sm" />
         <div className="absolute -top-24 -left-14 w-36 h-36 bg-green-600 rounded-full shadow-inner" />
         <div className="absolute -top-28 -left-4 w-32 h-32 bg-green-500 rounded-full shadow-sm" />
         <div className="absolute -top-16 -right-10 w-28 h-28 bg-green-600 rounded-full shadow-inner" />
      </div>


      {/* Front Lawn Hill */}
      <div className="absolute bottom-0 left-[-10%] right-[-10%] h-[30%] bg-emerald-400 rounded-[50%_50%_0_0] translate-y-4 shadow-lg" />

      {/* Fence */}
      <div className="absolute bottom-[25%] left-0 right-0 flex justify-center items-end gap-3 md:gap-6 opacity-90 px-4">
          {Array.from({ length: 20 }).map((_, i) => (
             <div key={i} className="w-10 md:w-16 h-14 md:h-20 bg-white rounded-t-xl relative shadow-sm shrink-0 border-x border-gray-100">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-300 rounded-full" />
             </div>
          ))}
      </div>
      <div className="absolute bottom-[28%] left-0 right-0 h-3 bg-white shadow-sm" />
      
      {/* Foreground Flowers - Layer 1 */}
      <div className="absolute bottom-[15%] left-0 right-0 flex justify-around px-8 items-end opacity-90 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
             <div key={i} className={`relative ${i % 3 === 0 ? 'mb-8' : 'mb-0'}`}>
                <div className="w-1 h-16 bg-green-700 mx-auto" />
                <div className="absolute -top-4 -left-3 w-8 h-8 rounded-full flex items-center justify-center animate-pulse" 
                     style={{ animationDelay: `${i * 0.2}s`, animationDuration: '3s' }}>
                    {/* Flower Head */}
                    <div className={`w-8 h-8 rounded-full ${['bg-pink-400', 'bg-yellow-400', 'bg-purple-400', 'bg-red-400'][i % 4]} shadow-sm relative`}>
                        <div className="absolute inset-0 bg-white/20 rounded-full scale-50" />
                    </div>
                </div>
                {/* Leaves */}
                <div className="absolute bottom-4 -left-3 w-4 h-2 bg-green-600 rounded-full rotate-[-45deg]" />
                <div className="absolute bottom-6 -right-3 w-4 h-2 bg-green-600 rounded-full rotate-[45deg]" />
             </div>
          ))}
      </div>

      {/* Foreground Flowers - Layer 2 (Closer) */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 items-end pointer-events-none">
         {/* Left Patch */}
         <div className="flex gap-2 items-end mb-4">
            <div className="w-20 h-20 bg-green-600 rounded-full translate-y-10 relative">
               <div className="absolute -top-2 left-2 w-6 h-6 bg-blue-400 rounded-full" />
               <div className="absolute top-2 left-10 w-6 h-6 bg-blue-300 rounded-full" />
               <div className="absolute top-4 left-4 w-6 h-6 bg-indigo-400 rounded-full" />
            </div>
            <div className="w-24 h-16 bg-green-500 rounded-full translate-y-8 relative -ml-8">
               <div className="absolute -top-4 right-8 w-8 h-8 bg-orange-400 rounded-full border-4 border-yellow-200" />
            </div>
         </div>

         {/* Right Patch */}
         <div className="flex gap-2 items-end mb-2">
             <div className="w-24 h-24 bg-green-600 rounded-full translate-y-12 relative">
                <div className="absolute -top-4 left-6 w-8 h-8 bg-pink-500 rounded-full border-2 border-white" />
                <div className="absolute top-2 left-12 w-6 h-6 bg-pink-400 rounded-full" />
             </div>
         </div>
      </div>

    </div>
  );
};

const renderFlower = (type: string, size: number, color: string) => {
    // Simple inline SVGs for falling flowers
    switch(type) {
        case 'daisy':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{overflow:'visible'}}>
                    {/* Petals */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                        <ellipse key={deg} cx="12" cy="5" rx="2" ry="5" fill={color} transform={`rotate(${deg} 12 12)`} />
                    ))}
                    <circle cx="12" cy="12" r="3.5" fill="#f59e0b" />
                </svg>
            );
        case 'tulip':
             return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{overflow:'visible'}}>
                   <path d="M12 2C9 5 5 5 5 10C5 15 12 20 12 20C12 20 19 15 19 10C19 5 15 5 12 2Z" />
                   <path d="M12 2V12" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                </svg>
             );
        case 'sakura':
             return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{overflow:'visible'}}>
                    {[0, 72, 144, 216, 288].map(deg => (
                         <path key={deg} d="M12 12 Q15 6 12 2 Q9 6 12 12" fill={color} transform={`rotate(${deg} 12 12)`} />
                    ))}
                    <circle cx="12" cy="12" r="2" fill="#fde047" />
                </svg>
             );
        case 'round':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                   <circle cx="12" cy="12" r="10" />
                   <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                </svg>
            );
        default: // petal shape
            return (
               <div style={{
                  width: size * 0.7,
                  height: size * 0.7,
                  backgroundColor: color,
                  borderRadius: '50% 0 50% 50%',
                  transform: 'rotate(-45deg)',
               }} />
            );
    }
}

const PetalBackground = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // Generate falling items
    const types = ['daisy', 'tulip', 'sakura', 'round', 'petal', 'petal'];
    const colors = ['#fbcfe8', '#f9a8d4', '#f472b6', '#fce7f3', '#f87171', '#c084fc', '#e879f9', '#ffffff'];
    
    const newItems = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      left: Math.random() * 100 + '%',
      animationDuration: 10 + Math.random() * 20 + 's',
      animationDelay: -Math.random() * 20 + 's', 
      opacity: 0.4 + Math.random() * 0.6,
      size: 20 + Math.random() * 25,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) translateX(0) rotate(0deg); }
          25% { transform: translateY(25vh) translateX(20px) rotate(45deg); }
          50% { transform: translateY(50vh) translateX(-20px) rotate(90deg); }
          75% { transform: translateY(75vh) translateX(20px) rotate(135deg); }
          100% { transform: translateY(110vh) translateX(-10px) rotate(180deg); }
        }
      `}</style>
      {items.map(item => (
        <div
          key={item.id}
          className="absolute"
          style={{
            left: item.left,
            top: '-50px',
            opacity: item.opacity,
            animation: `fall ${item.animationDuration} linear infinite`,
            animationDelay: item.animationDelay,
            // Apply initial rotation via transform if needed, but animation handles rotation
          }}
        >
            <div style={{ transform: `rotate(${item.rotation}deg)` }}>
               {renderFlower(item.type, item.size, item.color)}
            </div>
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [state, setState] = useState<BouquetState>(INITIAL_STATE);
  const [selectedFlowerId, setSelectedFlowerId] = useState<string | null>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpdateState = (updates: Partial<BouquetState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleAddFlower = (type: FlowerType, color: string, x?: number, y?: number) => {
    const newFlower: Flower = {
      id: crypto.randomUUID(),
      type,
      color,
      x: x ?? CANVAS_WIDTH / 2 + (Math.random() - 0.5) * 100, // Random jitter center
      y: y ?? CANVAS_HEIGHT / 2 - 100 + (Math.random() - 0.5) * 50,
      scale: 1,
      rotation: (Math.random() - 0.5) * 0.5, // Slight tilt
      stemColor: '#4d7c0f' // Green-700
    };

    setState(prev => ({
      ...prev,
      flowers: [...prev.flowers, newFlower].sort((a,b) => a.y - b.y) // Maintain simplified z-sort
    }));
  };

  const handleRemoveFlower = (id: string) => {
    setState(prev => ({
      ...prev,
      flowers: prev.flowers.filter(f => f.id !== id)
    }));
    if (selectedFlowerId === id) setSelectedFlowerId(null);
  };

  const handleUpdateFlower = (id: string, updates: Partial<Flower>) => {
    setState(prev => ({
      ...prev,
      flowers: prev.flowers.map(f => f.id === id ? { ...f, ...updates } : f)
    }));
  };

  const handleFlowerMove = (id: string, x: number, y: number) => {
    // Boundary check
    const clampedX = Math.max(50, Math.min(CANVAS_WIDTH - 50, x));
    const clampedY = Math.max(50, Math.min(CANVAS_HEIGHT - 50, y));
    handleUpdateFlower(id, { x: clampedX, y: clampedY });
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Create a high-res link
    const link = document.createElement('a');
    link.download = `my-bouquet-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  const handleAIGenerate = async (prompt: string) => {
    setIsGenerating(true);
    const recipe = await generateBouquetRecipe(prompt);
    
    if (recipe) {
      const newFlowers: Flower[] = [];
      const centerX = CANVAS_WIDTH / 2;
      const centerY = CANVAS_HEIGHT / 2 - 100;

      // Distribute flowers in a phyllotaxis spiral for natural look
      let currentCount = 0;
      const totalFlowers = recipe.flowers.reduce((acc, curr) => acc + curr.count, 0);

      recipe.flowers.forEach(group => {
        for (let i = 0; i < group.count; i++) {
           const angle = currentCount * 137.5; // Golden angle
           const radius = 30 * Math.sqrt(currentCount);
           const x = centerX + radius * Math.cos(angle * Math.PI / 180);
           const y = centerY + radius * Math.sin(angle * Math.PI / 180) - (currentCount * 5); // Lift up slightly as they go out

           newFlowers.push({
             id: crypto.randomUUID(),
             type: group.type,
             color: group.color,
             x: x + (Math.random() - 0.5) * 20, // Jitter
             y: y + (Math.random() - 0.5) * 20,
             scale: 1,
             rotation: (Math.random() - 0.5),
             stemColor: '#4d7c0f'
           });
           currentCount++;
        }
      });

      setState(prev => ({
        ...prev,
        flowers: newFlowers.sort((a,b) => a.y - b.y),
        ribbonColor: recipe.ribbonColor,
        wrapperColor: recipe.wrapperColor
      }));
      
      setIsAIModalOpen(false);
    }
    setIsGenerating(false);
  };

  if (showLanding) {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center p-8 text-center overflow-hidden">
         <GardenBackground />
         <PetalBackground />
         
         <div className="relative z-20 animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col items-center">
            {/* Transparent container removed as requested */}
            <div className="p-4 max-w-3xl">
              <h1 className="text-6xl md:text-8xl text-white mb-6 font-aesthetic tracking-wider drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)] text-stroke-sm">
                flower for you
              </h1>
              <p className="text-xl md:text-2xl text-white max-w-2xl mb-10 font-cute font-bold drop-shadow-md">
                Create cute, custom flower bouquets for your loved ones with just a few clicks. 
              </p>
              
              <button 
                onClick={() => setShowLanding(false)}
                className="group relative px-10 py-5 bg-white text-pink-400 text-xl font-cute font-bold rounded-full shadow-lg hover:bg-pink-50 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
              >
                Let's build your bouquet
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
         </div>

         <div className="absolute bottom-4 left-0 right-0 text-center z-20">
            <p className="text-sm font-bold tracking-[0.2em] text-white/90 uppercase font-cute drop-shadow-sm">
               Created by Jake Lupig
            </p>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 lg:p-8 animate-in fade-in duration-500 relative overflow-x-hidden">
      
      {/* Background - Reused from Landing, no petals. Fixed position so it stays while scrolling. */}
      <GardenBackground />

      {/* Back button */}
      <div className="absolute top-6 left-6 z-10">
        <button 
           onClick={() => setShowLanding(true)}
           className="flex items-center gap-2 text-pink-500 hover:text-pink-600 font-cute font-bold text-lg transition-colors px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md"
        >
          <ChevronLeft size={20} />
          Back
        </button>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[800px] mt-12 lg:mt-0 relative z-10 pb-10">
        {/* Canvas Area */}
        <div className="lg:col-span-8 h-[500px] lg:h-full flex items-center justify-center p-4">
           <BouquetCanvas 
             state={state}
             onFlowerSelect={setSelectedFlowerId}
             onFlowerMove={handleFlowerMove}
             selectedFlowerId={selectedFlowerId}
             canvasRef={canvasRef}
           />
        </div>

        {/* Controls Area */}
        {/* Added fixed height on mobile (600px) so the internal scrolling in Controls works, keeping Download button sticky at bottom of card */}
        <div className="lg:col-span-4 h-[600px] lg:h-full">
           <Controls 
             state={state}
             selectedFlowerId={selectedFlowerId}
             onUpdateState={handleUpdateState}
             onAddFlower={handleAddFlower}
             onRemoveFlower={handleRemoveFlower}
             onUpdateFlower={handleUpdateFlower}
             onDownload={handleDownload}
             onOpenAIModal={() => setIsAIModalOpen(true)}
           />
        </div>
      </div>

      <AIModal 
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onGenerate={handleAIGenerate}
        isGenerating={isGenerating}
      />
    </div>
  );
};

export default App;