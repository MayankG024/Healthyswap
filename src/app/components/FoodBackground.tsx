import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function FoodBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const foodItems = [
    // Vegetables & Healthy Foods - starting from left side, sliding across
    { emoji: '🥑', color: '#6BCF7F', size: 70, startX: -10, endX: 110, y: 15, duration: 25 },
    { emoji: '🥕', color: '#FFB347', size: 65, startX: -10, endX: 110, y: 35, duration: 30 },
    { emoji: '🥦', color: '#6BCF7F', size: 68, startX: -10, endX: 110, y: 55, duration: 28 },
    { emoji: '🍅', color: '#FF9B73', size: 60, startX: -10, endX: 110, y: 75, duration: 26 },
    { emoji: '🌽', color: '#FFD93D', size: 65, startX: -10, endX: 110, y: 25, duration: 32 },
    { emoji: '🥬', color: '#A8E6B5', size: 62, startX: -10, endX: 110, y: 65, duration: 27 },
    { emoji: '🫑', color: '#6BCF7F', size: 64, startX: -10, endX: 110, y: 45, duration: 29 },
    { emoji: '🥒', color: '#6BCF7F', size: 58, startX: -10, endX: 110, y: 85, duration: 31 },
    { emoji: '🍓', color: '#FF9B73', size: 56, startX: -10, endX: 110, y: 20, duration: 24 },
    { emoji: '🫐', color: '#6DD5FA', size: 54, startX: -10, endX: 110, y: 50, duration: 33 },
    { emoji: '🍊', color: '#FFB347', size: 66, startX: -10, endX: 110, y: 10, duration: 28 },
    { emoji: '🍋', color: '#FFD93D', size: 58, startX: -10, endX: 110, y: 70, duration: 26 },
    { emoji: '🥗', color: '#A8E6B5', size: 72, startX: -10, endX: 110, y: 40, duration: 30 },
    { emoji: '🥙', color: '#FFEAA7', size: 68, startX: -10, endX: 110, y: 60, duration: 27 },
    { emoji: '🍇', color: '#C490E4', size: 60, startX: -10, endX: 110, y: 30, duration: 29 },
    { emoji: '🥝', color: '#6BCF7F', size: 58, startX: -10, endX: 110, y: 80, duration: 25 },
  ];

  if (!mounted) return null;
  
  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      {/* Colorful layered backgrounds with bolder colors */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Yellow layer */}
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#FFD93D] opacity-30 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Light Blue layer */}
        <motion.div
          className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-[#6DD5FA] opacity-25 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Light Green layer */}
        <motion.div
          className="absolute -bottom-32 right-1/4 w-[550px] h-[550px] rounded-full bg-[#6BCF7F] opacity-25 blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        
        {/* Orange layer */}
        <motion.div
          className="absolute bottom-1/4 -right-20 w-[450px] h-[450px] rounded-full bg-[#FFB347] opacity-20 blur-3xl"
          animate={{
            scale: [1.05, 1, 1.05],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        
        {/* Cream accent */}
        <motion.div
          className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-[#FFF8E1] opacity-35 blur-3xl"
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Interactive food items sliding across screen */}
      {foodItems.map((item, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-auto cursor-pointer"
            initial={{
              left: `${item.startX}%`,
              top: `${item.y}%`,
              opacity: 0.6,
            }}
            animate={{
              left: [`${item.startX}%`, `${item.endX}%`],
              y: [0, -20, 20, 0],
              rotate: [0, 10, -10, 5, -5, 0],
            }}
            transition={{
              left: {
                duration: item.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 2,
              },
              y: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              rotate: {
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            whileHover={{
              opacity: 1,
              scale: 1.4,
              transition: { duration: 0.2 },
            }}
            style={{
              fontSize: `${item.size}px`,
            }}
          >
            <motion.div
              className="relative"
              style={{
                filter: `drop-shadow(0 8px 24px ${item.color})`,
              }}
            >
              {item.emoji}
            </motion.div>
          </motion.div>
        ))}
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle, #6BCF7F 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />
    </div>
  );
}
