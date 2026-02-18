import { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Image as ImageIcon, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface UploadCardProps {
  onSubmit: (input: string, image?: File) => void;
  isAnalyzing: boolean;
}

export default function UploadCard({ onSubmit, isAnalyzing }: UploadCardProps) {
  const [textInput, setTextInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URL to prevent memory leak
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Please use JPG, PNG, or WebP.');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('File too large. Maximum size is 5MB.');
      return;
    }

    // Revoke previous URL if exists
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setUploadedImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    toast.success('Image uploaded successfully!');
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (textInput.trim() || uploadedImage) {
      onSubmit(textInput, uploadedImage || undefined);
    }
  };

  const quickSuggestions = [
    { text: 'Butter chicken 🐓', color: 'bg-[#FFB347]', textColor: 'text-[#8B4000]' },
    { text: 'Instant noodles 🍜', color: 'bg-[#FFE082]', textColor: 'text-[#E65100]' },
    { text: 'Fried rice 🍚', color: 'bg-[#81C784]', textColor: 'text-[#1B5E20]' },
    { text: 'Pizza 🍕', color: 'bg-[#F48FB1]', textColor: 'text-[#880E4F]' },
    { text: 'Biryani 🍛', color: 'bg-[#FFAB91]', textColor: 'text-[#BF360C]' },
    { text: 'Samosa 🥟', color: 'bg-[#FFF59D]', textColor: 'text-[#F57F17]' },
    { text: 'Paneer masala 🧀', color: 'bg-[#CE93D8]', textColor: 'text-[#4A148C]' },
    { text: 'Chole bhature 🫓', color: 'bg-[#90CAF9]', textColor: 'text-[#01579B]' },
    { text: 'Dosa 🥞', color: 'bg-[#A5D6A7]', textColor: 'text-[#2E7D32]' },
    { text: 'Burger & fries 🍔', color: 'bg-[#FFCC80]', textColor: 'text-[#E65100]' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-[2.5rem] shadow-xl border-2 border-gray-100 overflow-hidden relative">
        {/* Image Upload Section */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative p-8 transition-all ${
            dragActive 
              ? 'bg-[#A8E6B5]' 
              : 'bg-[#FFF8E1]'
          }`}
        >
          {previewUrl ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                <img
                  src={previewUrl}
                  alt="Uploaded meal"
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <button
                onClick={() => {
                  if (previewUrl) {
                    URL.revokeObjectURL(previewUrl);
                  }
                  setUploadedImage(null);
                  setPreviewUrl('');
                  toast.info('Image removed');
                }}
                className="absolute top-4 right-4 px-5 py-2 bg-[#FFB347] text-white rounded-full font-bold hover:shadow-lg transition-all uppercase tracking-wide"
                style={{ fontFamily: 'Righteous' }}
              >
                Remove ✕
              </button>
            </motion.div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-3 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all ${
                dragActive 
                  ? 'border-[#6BCF7F] bg-[#A8E6B5]' 
                  : 'border-[#96E6FF] hover:border-[#FFB347] hover:bg-[#FFF8E1]'
              }`}
            >
              <div className="flex flex-col items-center gap-5">
                <motion.div 
                  className="w-24 h-24 bg-[#96E6FF] rounded-3xl flex items-center justify-center shadow-lg"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <Camera className="w-12 h-12 text-[#0277BD]" />
                </motion.div>
                <div>
                  <h3 className="text-3xl text-gray-900 mb-3 uppercase tracking-tight" style={{ fontFamily: 'Bebas Neue' }}>
                    Snap Your Meal
                  </h3>
                  <p className="text-lg text-gray-600 font-bold">
                    Drag & drop or click to upload
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 font-bold">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full">
                    <ImageIcon className="w-4 h-4" />
                    <span>JPG, PNG</span>
                  </div>
                  <span>•</span>
                  <span>Max 10MB</span>
                </div>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        {/* Text Input Section */}
        <div className="p-8 bg-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-1 bg-[#FFD93D] flex-1 rounded-full" />
            <div className="px-4 py-2 bg-[#FFEAA7] rounded-full">
              <span className="text-sm font-black text-[#FF9800] uppercase tracking-wide">OR TYPE IT</span>
            </div>
            <div className="h-1 bg-[#FFD93D] flex-1 rounded-full" />
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Type your meal... like 'butter chicken with naan'"
              className="w-full px-8 py-6 bg-[#FFF8E1] border-2 border-[#FFD93D] rounded-3xl focus:outline-none focus:border-[#FFB347] transition-all text-lg font-bold placeholder:text-gray-400"
              disabled={isAnalyzing}
              style={{ fontFamily: 'Fredoka' }}
            />
            <Zap className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#FFB347]" />
          </div>

          {/* Quick Suggestions */}
          <div className="mb-8">
            <p className="text-sm font-black text-gray-700 mb-4 uppercase tracking-wider" style={{ fontFamily: 'Bebas Neue', fontSize: '16px' }}>
              Quick Try:
            </p>
            <div className="flex flex-wrap gap-3">
              {quickSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setTextInput(suggestion.text.replace(/[^\w\s]/gi, '').trim())}
                  className={`px-6 py-3 ${suggestion.color} ${suggestion.textColor} rounded-2xl font-black hover:scale-105 hover:shadow-lg transition-all border-2 border-white shadow-md text-base`}
                  disabled={isAnalyzing}
                  style={{ fontFamily: 'Fredoka' }}
                >
                  {suggestion.text}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            onClick={handleSubmit}
            disabled={isAnalyzing || (!textInput.trim() && !uploadedImage)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-10 py-6 bg-[#6BCF7F] text-white rounded-3xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <Sparkles className="w-7 h-7" />
            <span className="text-2xl uppercase tracking-wide" style={{ fontFamily: 'Bebas Neue' }}>
              Get Healthier Version
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
