import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { flowers } from '../data/flowers.jsx';
import { WatercolorFilter } from '../components/flower-assets/FlowerAssets.jsx';

const SelectionScreen = ({ selectedFlowers, onAddFlower, onRemoveFlower, onNext }) => {
    const minFlowers = 6;
    const maxFlowers = 10;

    const getFlowerCount = (id) => selectedFlowers.filter(f => f.id === id).length;
    const totalCount = selectedFlowers.length;

    // Grouped counts for display
    const groupedSelection = Object.values(selectedFlowers.reduce((acc, flower) => {
        acc[flower.id] = acc[flower.id] || { ...flower, count: 0 };
        acc[flower.id].count++;
        return acc;
    }, {}));

    return (
        <div className="flex flex-col h-screen bg-[#F5F5DC] overflow-hidden">
            <WatercolorFilter />
            {/* Header */}
            <div className="text-center pt-8 pb-4 px-4 flex-none z-10 bg-[#F5F5DC]">
                <motion.h2
                    className="text-3xl md:text-4xl font-serif text-gray-900 mb-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Pick 6 to 10 blooms
                </motion.h2>
                <motion.p
                    className="text-gray-500 font-sans text-sm tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Choose flowers that remind you of them.
                </motion.p>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto px-4 pb-32">
                <motion.div
                    className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto pt-10"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.05 } }
                    }}
                >
                    {flowers.map((flower) => {
                        const count = getFlowerCount(flower.id);
                        const isSelected = count > 0;
                        return (
                            <motion.div
                                key={flower.id}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.9 },
                                    visible: { opacity: 1, scale: 1 }
                                }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => totalCount < maxFlowers && onAddFlower(flower)}
                                className={`
                  relative cursor-pointer transition-all duration-300 flex items-center justify-center
                  ${totalCount >= maxFlowers ? 'opacity-50 cursor-not-allowed grayscale' : ''}
                `}
                                style={{ width: '140px', height: '140px' }}
                            >
                                {/* Selected Indicator (Subtle ring or just scale) */}
                                {isSelected && (
                                    <motion.div
                                        layoutId="selected-ring"
                                        className="absolute inset-0 rounded-full border-2 border-gray-800 opacity-20"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1.2, opacity: 0.2 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}

                                <div className="w-full h-full p-2">
                                    {flower.image ? (
                                        <img
                                            src={flower.image}
                                            alt={flower.name}
                                            className="w-full h-full object-contain mix-blend-multiply brightness-110 contrast-125"
                                        />
                                    ) : (
                                        flower.component && <flower.component />
                                    )}
                                </div>

                                {/* Badge - Simplified or Removed based on "just the flowers only" */}
                                <AnimatePresence>
                                    {count > 0 && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-gray-900 text-white rounded-full text-xs font-medium shadow-sm z-10"
                                        >
                                            {count}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Bottom Bar */}
            <motion.div
                className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
            >
                <div className="flex flex-wrap gap-2 justify-center md:justify-start overflow-x-auto max-w-full md:max-w-3xl no-scrollbar">
                    {groupedSelection.length === 0 ? (
                        <span className="text-gray-400 italic text-sm py-1">Your bouquet is empty...</span>
                    ) : (
                        groupedSelection.map((item) => (
                            <motion.button
                                key={item.id}
                                layout
                                onClick={() => onRemoveFlower(item.id)}
                                className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-red-50 hover:text-red-600 transition-colors group"
                            >
                                <span> {item.name} ×{item.count}</span>
                                <span className="opacity-0 group-hover:opacity-100 text-xs">×</span>
                            </motion.button>
                        ))
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500 font-medium">
                        <span className={`${totalCount < minFlowers ? 'text-gray-400' : 'text-gray-900'}`}>{totalCount}</span>
                        <span className="mx-1">/</span>
                        <span>{maxFlowers}</span>
                    </div>

                    <button
                        onClick={onNext}
                        disabled={totalCount < minFlowers}
                        className={`
              px-8 py-3 rounded-sm text-sm font-medium tracking-widest transition-all duration-300
              ${totalCount >= minFlowers
                                ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-md'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
                    >
                        NEXT
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default SelectionScreen;
