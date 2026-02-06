import React, { useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (prompt: string) => Promise<void>;
  isGenerating: boolean;
}

const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose, onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');

  if (!isOpen) return null;

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg">
                <Sparkles size={24} className="text-yellow-300" />
            </div>
            <h2 className="text-xl font-bold">AI Florist</h2>
          </div>
          <p className="text-violet-100 text-sm">Tell me who this bouquet is for or the occasion, and I'll design the perfect arrangement.</p>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Describe your ideal bouquet</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A romantic bouquet for my anniversary with red and white flowers..."
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none resize-none h-32 text-gray-700 placeholder:text-gray-400"
            />
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Designing...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Design
              </>
            )}
          </button>
        </div>
        
        <div className="px-6 pb-6 text-center">
            <p className="text-xs text-gray-400">Powered by Google Gemini</p>
        </div>
      </div>
    </div>
  );
};

export default AIModal;
