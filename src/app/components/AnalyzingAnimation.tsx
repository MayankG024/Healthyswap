import { motion } from 'motion/react';
import { Sparkles, Scan, Check, Zap } from 'lucide-react';

export default function AnalyzingAnimation() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#FF6B9D]/80 via-[#A855F7]/80 to-[#7DD3FC]/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[2.5rem] shadow-2xl p-12 max-w-md mx-4 border-4 border-[#CDFF00] relative overflow-hidden"
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              'linear-gradient(45deg, #CDFF00, #FF6B9D)',
              'linear-gradient(45deg, #FF6B9D, #7DD3FC)',
              'linear-gradient(45deg, #7DD3FC, #CDFF00)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Animated Icon */}
        <div className="relative mb-8">
          <motion.div
            className="w-32 h-32 mx-auto bg-gradient-to-br from-[#CDFF00] via-[#4ADE80] to-[#7DD3FC] rounded-full flex items-center justify-center relative"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(205, 255, 0, 0.7)',
                '0 0 0 40px rgba(205, 255, 0, 0)',
                '0 0 0 0 rgba(205, 255, 0, 0)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              <Sparkles className="w-16 h-16 text-white" />
            </motion.div>
          </motion.div>

          {/* Orbiting food emojis */}
          {['🥑', '🥕', '🥦'].map((emoji, idx) => (
            <motion.div
              key={idx}
              className="absolute top-1/2 left-1/2 text-4xl"
              style={{
                transformOrigin: '0 0'
              }}
              animate={{
                rotate: [idx * 120, idx * 120 + 360],
                x: [
                  Math.cos((idx * 120 * Math.PI) / 180) * 80,
                  Math.cos(((idx * 120 + 360) * Math.PI) / 180) * 80
                ],
                y: [
                  Math.sin((idx * 120 * Math.PI) / 180) * 80,
                  Math.sin(((idx * 120 + 360) * Math.PI) / 180) * 80
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                delay: idx * 0.2
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        {/* Text */}
        <div className="text-center relative z-10">
          <h3 className="text-4xl text-gray-900 mb-4 uppercase tracking-tight" style={{ fontFamily: 'Bebas Neue' }}>
            🔍 Analyzing Your Meal!
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Identifying ingredients 🍅', delay: 0, color: 'from-[#FF6B9D] to-[#FFB3D4]' },
              { label: 'Calculating nutrition 📊', delay: 0.3, color: 'from-[#7DD3FC] to-[#BAE6FD]' },
              { label: 'Finding healthier swaps ✨', delay: 0.6, color: 'from-[#CDFF00] to-[#E8FF80]' }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: step.delay }}
                className={`flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r ${step.color} rounded-2xl font-bold text-gray-900`}
                style={{ fontFamily: 'Righteous' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: step.delay + 0.5 }}
                >
                  <Check className="w-5 h-5 text-emerald-600" />
                </motion.div>
                <span className="text-base">{step.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#CDFF00] via-[#FF6B9D] to-[#7DD3FC]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </div>

        {/* Fun text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6 text-sm text-gray-600 font-bold"
        >
          Hang tight! We're cooking up something healthy! 👨‍🍳
        </motion.p>
      </motion.div>
    </div>
  );
}
