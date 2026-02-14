import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from './Canvas';
import { Sparkles, Heart } from 'lucide-react';

export function RecipientView({ state }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFBE7] relative overflow-hidden p-6">

            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-100 rounded-full blur-[100px] opacity-30"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-100 rounded-full blur-[100px] opacity-30"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="z-10 w-full max-w-md flex flex-col items-center"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif text-[#1a1a1a] mb-2 tracking-wide">A Gift For You</h1>
                    <p className="text-stone-500 font-mono text-xs tracking-widest uppercase">Forever Florals</p>
                </div>

                <div className="w-full relative scale-90 sm:scale-100 mb-8">
                    <Canvas
                        selectedFlowers={state.selectedFlowers}
                        selectedGreenery={state.selectedGreenery}
                        selectedWrap={state.selectedWrap}
                    />
                </div>

                {state.note && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ delay: 2, duration: 0.8 }}
                        className="w-full max-w-sm bg-white p-8 shadow-sm border border-stone-100 relative"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#1a1a1a] rounded-full"></div>
                        <p className="font-mono text-sm leading-relaxed text-[#1a1a1a] whitespace-pre-wrap">
                            {state.note}
                        </p>
                        <div className="mt-6 text-right font-serif italic text-stone-400 text-sm">
                            - With Love
                        </div>
                    </motion.div>
                )}

                <motion.a
                    href="/"
                    whileHover={{ scale: 1.05 }}
                    className="mt-12 text-xs font-mono text-stone-400 border-b border-transparent hover:border-stone-400 pb-0.5 transition-all uppercase tracking-widest"
                >
                    Create your own
                </motion.a>

            </motion.div>
        </div>
    );
}
