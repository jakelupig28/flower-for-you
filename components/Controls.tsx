import React, { useState } from 'react';
import { BouquetState, FlowerType, RibbonStyle } from '../types';
import { DEFAULT_FLOWER_COLORS, FLOWER_LABELS, RIBBON_LABELS } from '../constants';
import { Plus, Trash2, Download, Wand2, Info, X } from 'lucide-react';

interface ControlsProps {
  state: BouquetState;
  selectedFlowerId: string | null;
  onUpdateState: (newState: Partial<BouquetState>) => void;
  onAddFlower: (type: FlowerType, color: string) => void;
  onRemoveFlower: (id: string) => void;
  onUpdateFlower: (id: string, updates: any) => void;
  onDownload: () => void;
  onOpenAIModal: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  state,
  selectedFlowerId,
  onUpdateState,
  onAddFlower,
  onRemoveFlower,
  onUpdateFlower,
  onDownload,
  onOpenAIModal
}) => {
  const [activeTab, setActiveTab] = useState<'flowers' | 'style'>('flowers');
  const [showTip, setShowTip] = useState(false);

  const selectedFlower = state.flowers.find(f => f.id === selectedFlowerId);

  return (
    <div className="flex flex-col h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100 overflow-hidden relative">
      {/* Header */}
      <div className="p-6 bg-pink-50/50 relative z-20">
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-3xl font-bold text-pink-300 mb-1 font-aesthetic">Bouquet Builder</h2>
                <p className="text-sm text-pink-300/80 font-cute">Customize your arrangement</p>
            </div>
            <button 
                onClick={() => setShowTip(!showTip)}
                className="text-pink-300 hover:text-pink-400 transition-colors p-1 rounded-full hover:bg-pink-100/50"
                title="Tips"
            >
                <Info size={24} />
            </button>
        </div>

        {/* Tip Popover */}
        {showTip && (
            <div className="absolute top-16 right-6 z-50 w-64 bg-white p-4 rounded-xl shadow-xl border border-pink-100 animate-in fade-in zoom-in-95 origin-top-right">
                <div className="flex justify-between items-start mb-3 pb-2 border-b border-pink-50">
                    <h4 className="font-bold text-pink-400 text-sm flex items-center gap-2 font-cute">
                        Quick Tips
                    </h4>
                    <button onClick={() => setShowTip(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={14} />
                    </button>
                </div>
                <ul className="text-xs text-gray-600 space-y-3 font-cute">
                    <li className="flex gap-2 items-start">
                        <span className="bg-pink-100 text-pink-500 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                        <span>The flowers on the canvas are <strong>draggable</strong>. Move them around to create your perfect shape!</span>
                    </li>
                    <li className="flex gap-2 items-start">
                        <span className="bg-pink-100 text-pink-500 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                        <span><strong>Click</strong> on a flower to select it. You can then change its <strong>color</strong> and <strong>size</strong> below.</span>
                    </li>
                </ul>
                <div className="absolute -top-2 right-2.5 w-4 h-4 bg-white border-t border-l border-pink-100 transform rotate-45"></div>
            </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-pink-100 z-10 relative bg-white/50">
        <button
          className={`flex-1 py-3 text-sm font-semibold transition-colors font-cute ${activeTab === 'flowers' ? 'text-pink-400 border-b-2 border-pink-300 bg-pink-50' : 'text-gray-400 hover:text-pink-300'}`}
          onClick={() => setActiveTab('flowers')}
        >
          Flowers
        </button>
        <button
          className={`flex-1 py-3 text-sm font-semibold transition-colors font-cute ${activeTab === 'style' ? 'text-pink-400 border-b-2 border-pink-300 bg-pink-50' : 'text-gray-400 hover:text-pink-300'}`}
          onClick={() => setActiveTab('style')}
        >
          Ribbon & Style
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-6 font-cute">
        
        {/* Gemini AI Banner */}
        <div className="bg-gradient-to-r from-violet-100 to-fuchsia-100 p-4 rounded-xl border border-violet-200">
           <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-violet-800 flex items-center gap-2">
                <Wand2 size={18} /> AI Florist
              </h3>
           </div>
           <p className="text-xs text-violet-700 mb-3">Need inspiration? Let AI design a bouquet for your special occasion.</p>
           <button 
             onClick={onOpenAIModal}
             className="w-full py-2 bg-white text-violet-700 font-semibold text-sm rounded-lg shadow-sm border border-violet-200 hover:bg-violet-50 transition-colors"
           >
             Ask AI to Create
           </button>
        </div>


        {activeTab === 'flowers' && (
          <>
            {/* Add Flower Section */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">Add Flowers</h3>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(FlowerType) as Array<keyof typeof FlowerType>).map((type) => (
                  <button
                    key={type}
                    onClick={() => onAddFlower(FlowerType[type], DEFAULT_FLOWER_COLORS[FlowerType[type]])}
                    className="flex items-center gap-2 p-2 rounded-lg border border-pink-100 hover:bg-pink-50 hover:border-pink-200 transition-all group text-left"
                  >
                    <div 
                      className="w-6 h-6 rounded-full border border-gray-100 shadow-sm" 
                      style={{ backgroundColor: DEFAULT_FLOWER_COLORS[FlowerType[type]] }}
                    />
                    <span className="text-sm text-gray-600 font-medium group-hover:text-pink-400">{FLOWER_LABELS[FlowerType[type]]}</span>
                    <Plus size={14} className="ml-auto text-pink-200 group-hover:text-pink-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Flower Editor */}
            {selectedFlower ? (
              <div className="p-4 bg-pink-50 rounded-xl border border-pink-100 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-pink-400">Editing: {FLOWER_LABELS[selectedFlower.type]}</h3>
                  <button 
                    onClick={() => onRemoveFlower(selectedFlower.id)}
                    className="p-1.5 text-pink-300 hover:text-red-400 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-pink-400 mb-1">Color</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={selectedFlower.color}
                        onChange={(e) => onUpdateFlower(selectedFlower.id, { color: e.target.value })}
                        className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                      />
                      <span className="text-xs text-gray-400 font-mono">{selectedFlower.color}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-pink-400 mb-1">Size</label>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="2" 
                      step="0.1"
                      value={selectedFlower.scale}
                      onChange={(e) => onUpdateFlower(selectedFlower.id, { scale: parseFloat(e.target.value) })}
                      className="w-full accent-pink-300 h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center border-2 border-dashed border-pink-100 rounded-xl">
                <p className="text-sm text-pink-300/70">Select a flower on the canvas to edit its color and size.</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'style' && (
          <div className="space-y-6">
            {/* Ribbon Settings */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">Ribbon</h3>
              <div className="space-y-3">
                 <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2">Style</label>
                    <div className="flex gap-2">
                      {(Object.keys(RibbonStyle) as Array<keyof typeof RibbonStyle>).map((style) => (
                        <button
                          key={style}
                          onClick={() => onUpdateState({ ribbonStyle: RibbonStyle[style] })}
                          className={`px-3 py-1.5 text-xs rounded-full border transition-all ${state.ribbonStyle === RibbonStyle[style] ? 'bg-pink-300 text-white border-pink-300' : 'bg-white text-gray-500 border-gray-200 hover:border-pink-200'}`}
                        >
                          {RIBBON_LABELS[RibbonStyle[style]]}
                        </button>
                      ))}
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Color</label>
                    <input 
                        type="color" 
                        value={state.ribbonColor}
                        onChange={(e) => onUpdateState({ ribbonColor: e.target.value })}
                        className="w-full h-8 rounded cursor-pointer border-gray-200"
                      />
                 </div>
              </div>
            </div>

            {/* Wrapper Settings */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">Wrapping</h3>
              <div className="flex items-center gap-3 mb-3">
                <input 
                  type="checkbox"
                  id="hasWrapper"
                  checked={state.hasWrapper}
                  onChange={(e) => onUpdateState({ hasWrapper: e.target.checked })}
                  className="w-4 h-4 text-pink-300 rounded border-gray-300 focus:ring-pink-300"
                />
                <label htmlFor="hasWrapper" className="text-sm text-gray-600">Include Paper Wrapper</label>
              </div>
              {state.hasWrapper && (
                 <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Paper Color</label>
                    <input 
                        type="color" 
                        value={state.wrapperColor}
                        onChange={(e) => onUpdateState({ wrapperColor: e.target.value })}
                        className="w-full h-8 rounded cursor-pointer border-gray-200"
                      />
                 </div>
              )}
            </div>

            {/* Background */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">Background</h3>
              <input 
                  type="color" 
                  value={state.backgroundColor}
                  onChange={(e) => onUpdateState({ backgroundColor: e.target.value })}
                  className="w-full h-8 rounded cursor-pointer border-gray-200"
                />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-pink-100 bg-pink-50/50">
        <button 
          onClick={onDownload}
          className="w-full flex items-center justify-center gap-2 py-3 bg-pink-300 hover:bg-pink-400 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 font-cute"
        >
          <Download size={20} />
          Download Bouquet
        </button>
      </div>
    </div>
  );
};

export default Controls;