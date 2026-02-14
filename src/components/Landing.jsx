import React, { useMemo } from 'react';
import { RoseRed, Sunflower, TulipPink } from './flower-assets/FlowerAssets';
import { motion } from 'framer-motion';

export function Landing({ onStart }) {
    // Randomly select one hero flower for display, memoized to be pure
    const HeroFlower = useMemo(() => [RoseRed, Sunflower, TulipPink][Math.floor(Math.random() * 3)], []);

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#FDFBE7] text-center p-6 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-100 rounded-full blur-[80px] opacity-40"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-100 rounded-full blur-[80px] opacity-40"></div>
            </div>

            {/* Decorative Element */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, type: "spring" }}
                className="mb-12 relative z-10"
            >
                <div className="w-40 h-40 mx-auto drop-shadow-lg">
                    <HeroFlower />
                </div>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl md:text-7xl font-serif text-[#1a1a1a] mb-4 tracking-tight drop-shadow-sm"
            >
                Forever Florals
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-sm md:text-base font-mono text-[#5a5a5a] mb-12 tracking-widest uppercase"
            >
                Beautiful Flowers • Delivered Digitally
            </motion.p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStart}
                className="bg-[#1a1a1a] text-[#FDFBE7] px-8 py-4 text-sm font-mono uppercase tracking-widest hover:bg-[#333] transition-colors shadow-lg"
            >
                Build a Bouquet
            </motion.button>

            <div className="fixed bottom-8 text-[10px] font-mono text-[#8a8a8a]">
                MADE WITH 💖
            </div>
        </div>
    );
}
