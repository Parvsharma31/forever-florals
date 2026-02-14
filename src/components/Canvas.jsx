import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { flowers } from '../data/flowers.jsx';
import * as FlowerAssets from './flower-assets/FlowerAssets';

// Helper to get flower data by ID
const getFlower = (id) => flowers.find(f => f.id === id);
const getGreenery = (id) => null; // No greenery in current MVP

export function Canvas({ selectedFlowers, selectedGreenery }) {

    // Deterministic positioning based on index
    const getPosition = (index, total) => {
        // Fan layout
        // Increase spread for wider fan
        const angleStep = 60 / Math.max(total - 1, 1); // 60 degrees total spread if packed
        const startAngle = total === 1 ? 0 : -30;
        const angle = total === 1 ? 0 : startAngle + (index * angleStep);

        // Convert angle to x/y visual adjustment
        const x = Math.sin(angle * (Math.PI / 180)) * 100; // Wider radius
        const y = Math.cos(angle * (Math.PI / 180)) * -40 + (Math.abs(x) * 0.1); // Arched top

        return { x: `${x}%`, y: `${y}px`, rotate: angle };
    };

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">

            {/* Global Filter Def */}
            <FlowerAssets.WatercolorFilter />

            <div className="relative w-[300px] h-[500px] flex flex-col items-center justify-end pb-20">

                {/* Back Greenery Layer */}
                {selectedGreenery.map((id) => {
                    const g = getGreenery(id);
                    if (g?.layer !== 'back') return null;
                    const Component = FlowerAssets[g.component];
                    return (
                        <div key={`green-back-${id}`} className="absolute bottom-40 z-0 flex justify-center w-full pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute bottom-0 opacity-80"
                                style={{
                                    transform: `scale(1.5) translateY(20px)`,
                                    zIndex: 0,
                                    width: '250px',
                                    height: '250px'
                                }}
                            >
                                {Component ? <Component /> : null}
                            </motion.div>
                        </div>
                    );
                })}

                {/* Flowers Layer (No Wrap) */}
                <div className="absolute bottom-40 z-20 w-full h-[300px] pointer-events-none">
                    <AnimatePresence>
                        {selectedFlowers.map((flowerId, index) => {
                            const flower = getFlower(flowerId);
                            if (!flower) return null;
                            const Component = flower.component;
                            const pos = getPosition(index, selectedFlowers.length);
                            // Random small variations for natural look
                            const randomRotation = (index % 3 - 1) * 3;

                            return (
                                <motion.div
                                    key={`${flower.id}-${index}`}
                                    layoutId={`${flower.id}-${index}`}
                                    initial={{ scale: 0, y: 50, opacity: 0 }}
                                    animate={{ scale: 1, y: 0, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 180, damping: 20 }}
                                    className="absolute bottom-0 left-1/2 origin-bottom"
                                    style={{
                                        marginLeft: '-50px',
                                        width: '100px',
                                        height: '280px',
                                        x: pos.x,
                                        rotate: pos.rotate + randomRotation,
                                        bottom: '0px',
                                        zIndex: index + 1
                                    }}
                                >
                                    <div className="w-full h-full relative flex flex-col items-center justify-start">
                                        {/* SVG Component */}
                                        <div className="relative w-full h-full -mt-2">
                                            {flower.image ? (
                                                <img
                                                    src={flower.image}
                                                    alt={flower.name}
                                                    className="w-full h-full object-contain mix-blend-multiply brightness-110 contrast-125"
                                                />
                                            ) : (
                                                Component ? <Component /> : <div className="w-full h-full bg-red-500 rounded-full" />
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Front Greenery Layer */}
                <div className="absolute bottom-10 z-30 pointer-events-none">
                    {selectedGreenery.map((id, i) => {
                        const g = getGreenery(id);
                        if (g?.layer !== 'front') return null;
                        const Component = FlowerAssets[g.component];
                        return (
                            <motion.div
                                key={`green-front-${id}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute bottom-0"
                                style={{
                                    left: i % 2 === 0 ? '-60px' : '60px',
                                    transform: `rotate(${i % 2 === 0 ? '-30' : '30'}deg) scale(0.9)`,
                                    width: '180px',
                                    height: '180px'
                                }}
                            >
                                {Component ? <Component /> : null}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Label Removed as requested */}

            </div>
        </div>
    );
}
