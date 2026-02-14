import React from 'react';
import { motion } from 'framer-motion';
import { Flower } from 'lucide-react';

const LandingPage = ({ onStart, onViewSample }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-[#FFF0F5]">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <Flower size={60} className="text-[#C2185B] mx-auto mb-8 opacity-80" strokeWidth={1} />
            </motion.div>

            <motion.h1
                className="text-4xl md:text-7xl font-serif text-[#4A0E0E] mb-4 tracking-tight px-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                Forever Florals
            </motion.h1>

            <motion.p
                className="text-lg md:text-2xl font-light text-[#880E4F] mb-12 md:mb-16 tracking-wide px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
            >
                Send flowers that stay.
            </motion.p>

            <motion.div
                className="flex flex-col md:flex-row gap-4 md:gap-6 items-center w-full md:w-auto px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                <button
                    onClick={onStart}
                    className="w-full md:w-auto px-8 py-3 md:px-10 md:py-4 bg-[#C2185B] text-white text-base md:text-lg font-medium tracking-wider hover:bg-[#880E4F] transition-all duration-300 rounded-sm shadow-sm hover:shadow-md"
                >
                    Build a bouquet
                </button>

                <button
                    onClick={onViewSample}
                    className="w-full md:w-auto px-8 py-3 md:px-10 md:py-4 border border-[#C2185B] text-[#C2185B] text-base md:text-lg font-medium tracking-wider hover:border-[#880E4F] hover:text-[#880E4F] transition-all duration-300 rounded-sm"
                >
                    View a sample bouquet
                </button>
            </motion.div>

            <motion.div
                className="absolute bottom-8 text-sm text-[#880E4F] font-serif italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                Made with care, not just clicks.
            </motion.div>
        </div>
    );
};

export default LandingPage;
