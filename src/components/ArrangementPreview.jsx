import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { flowers } from '../data/flowers.jsx';

const ArrangementPreview = ({ selectedFlowers, selectedGreenery, onNext, onBack, isFinal = false }) => {
    const [arrangement, setArrangement] = useState([]);

    // Function to generate random positions
    const generateArrangement = () => {
        const newArrangement = [];

        // Add greenery first (background layer)
        selectedGreenery.forEach((item, index) => {
            newArrangement.push({
                ...item,
                type: 'greenery',
                x: Math.random() * 40 - 20, // -20 to 20
                y: Math.random() * 30 - 15,
                rotation: Math.random() * 60 - 30,
                scale: 0.8 + Math.random() * 0.4,
                zIndex: index // Lower z-index
            });
        });

        // Add flowers (foreground layer)
        // Add flowers (foreground layer)
        const total = selectedFlowers.length;
        selectedFlowers.forEach((item, index) => {
            // Distribute in a wide fan
            // Use golden angle or simple linear distribution for natural look

            // Normalize index to -1 to 1 range
            const normalizedIndex = total > 1 ? (index / (total - 1)) * 2 - 1 : 0;

            // X spread: -100 to 100
            const x = normalizedIndex * 80 + (Math.random() * 40 - 20);

            // Y spread: Arched (center higher or lower) + random
            // In bouquets, center flowers are often higher (y is smaller)
            const y = Math.abs(normalizedIndex) * 20 + (Math.random() * 40 - 20) - 20;

            // Rotation follows the fan
            const rotation = normalizedIndex * 30 + (Math.random() * 20 - 10);

            // Scale: Slight variation
            const scale = 0.9 + Math.random() * 0.4;

            newArrangement.push({
                ...item,
                type: 'flower',
                x,
                y,
                rotation,
                scale,
                zIndex: selectedGreenery.length + index // Higher z-index
            });
        });

        // Sort by z-index to ensure correct layering order in DOM
        // But we actually might want to shuffle them a bit for a more natural look where some greenery might poke through? 
        // For now, simple layering: Greenery back, Flowers front is safer.

        setArrangement(newArrangement);
    };

    // Initial generation
    useEffect(() => {
        generateArrangement();
    }, [selectedFlowers, selectedGreenery]);

    return (
        <div className={`flex flex-col items-center justify-center ${isFinal ? '' : 'p-6 md:p-12 min-h-screen'}`}>
            {!isFinal && (
                <>
                    <motion.h2
                        className="text-3xl md:text-4xl font-serif text-[#4A0E0E] mb-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Your Arrangement
                    </motion.h2>
                    <motion.p
                        className="text-[#880E4F] mb-8 italic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        A sneak peek at your creation
                    </motion.p>
                </>
            )}

            {/* Bouquet Stage */}
            <div className="relative w-80 h-96 md:w-96 md:h-[500px] bg-white/40 rounded-full border-4 border-double border-pink-200 shadow-xl flex items-center justify-center overflow-visible mb-8">
                <AnimatePresence>
                    {arrangement.map((item, index) => (
                        <motion.div
                            key={`${item.id}-${index}`}
                            className="absolute pointer-events-none"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: 1,
                                scale: item.scale,
                                x: item.x,
                                y: item.y,
                                rotate: item.rotation
                            }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.05,
                                type: "spring",
                                stiffness: 100
                            }}
                            style={{ zIndex: item.zIndex }}
                        >
                            <div className={`w-24 h-24 relative`}>
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-contain mix-blend-multiply brightness-110 contrast-125"
                                    />
                                ) : (
                                    item.component && <item.component />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Optional: Add a ribbon or vase base */}
                <div className="absolute bottom-4 opacity-50 font-serif text-xs text-[#880E4F]">
                    Forever Florals
                </div>
            </div>

            {!isFinal && (
                <div className="flex flex-col gap-4 items-center">
                    <button
                        onClick={generateArrangement}
                        className="text-sm border-b border-[#880E4F] text-[#880E4F] hover:text-[#4A0E0E] hover:border-[#4A0E0E] transition-colors"
                    >
                        Shuffle Arrangement
                    </button>

                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={onBack}
                            className="px-6 py-2 rounded-full border border-[#880E4F] text-[#880E4F] hover:bg-pink-100 transition-colors"
                        >
                            BACK
                        </button>
                        <button
                            onClick={onNext}
                            className="px-8 py-3 bg-[#C2185B] text-white rounded-full text-lg tracking-widest hover:bg-[#880E4F] transition-all shadow-lg"
                        >
                            WRITE NOTE
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArrangementPreview;
